/**
 * @author mrdoob / http://mrdoob.com/
 */

function MenubarFile(editor) {
	var signals = editor.signals;

	var container = new UI.Panel();
	container.setClass('menu');

	var title = new UI.Panel();
	title.setClass('title');
	title.setTextContent('File');
	container.add(title);

	var options = new UI.Panel();
	options.setClass('options');
	container.add(options);

	// New

	var option = new UI.Row();
	option.setClass('option');
	option.setTextContent('New');
	option.onClick(function () {
		if (confirm('Any unsaved data will be lost. Are you sure?')) {
			editor.clear();
		}
	});
	options.add(option);

	// import

	var option = new UI.Panel();
	option.setClass('option');
	option.setTextContent('Import');
	option.onClick(Import);
	options.add(option);

	var fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.addEventListener('change', function (event) {
		var reader = new FileReader();
		reader.addEventListener(
			'load',
			function (event) {
				editor.clear();
				editor.fromJSON(JSON.parse(event.target.result));
			},
			false
		);

		reader.readAsText(fileInput.files[0]);
	});

	function Import() {
		if (confirm('Any unsaved data will be lost. Are you sure?')) fileInput.click();
	}

	// export

	var option = new UI.DownloadPanel();
	option.setClass('option');
	option.setTextContent('Export');
	option.onClick(Export);
	options.add(option);

	signals.exportState.add(Export);

	function Export() {
		const filename = 'project.json';
		const link = option.dom;
		const output = JSON.stringify(editor.toJSON(), null, '\t');
		link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
		link.setAttribute('download', filename);
	}

	// read

	// write

	var option = new UI.Panel();
	option.setClass('option');
	option.setTextContent('Write');
	option.onClick(Write);
	options.add(option);

	function Write() {
		axios
			.post(editor.config.POST_URL, editor.toJSON())
			.then(function (response) {
				console.log(response);
			})
			.catch(function (err) {});
		editor.config.setKey('state', JSON.stringify(editor.toJSON()));
	}

	// var Menubar = new UI.Panel();
	// option.setClass('option');

	return container;
}

export { MenubarFile };
