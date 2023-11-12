









AUI.add(
	'portal-available-languages',
	function(A) {
		var available = {};

		var direction = {};

		

			available['cs_CZ'] = 'čeština (Česká republika)';
			direction['cs_CZ'] = 'ltr';

		

			available['ru_RU'] = 'Russian (Russia)';
			direction['ru_RU'] = 'ltr';

		

			available['ro_MD'] = 'Romanian (Moldova)';
			direction['ro_MD'] = 'ltr';

		

			available['vi_VN'] = 'Vietnamese (Vietnam)';
			direction['vi_VN'] = 'ltr';

		

			available['uk_UA'] = 'Ukrainian (Ukraine)';
			direction['uk_UA'] = 'ltr';

		

			available['mn_MN'] = 'Mongolian (Mongolia)';
			direction['mn_MN'] = 'ltr';

		

			available['en_GB'] = 'English (United Kingdom)';
			direction['en_GB'] = 'ltr';

		

		Liferay.Language.available = available;
		Liferay.Language.direction = direction;
	},
	'',
	{
		requires: ['liferay-language']
	}
);