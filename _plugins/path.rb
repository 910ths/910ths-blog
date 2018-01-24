module Jekyll
	class Path < Liquid::Tag

		def initialize(tag_name, variable, tokens)

			super
			@variable           = variable
			@arabic_slug        = 'ar'
			@arabic_prefix      = 'arabic_'
			@arabic_url_prefix  = ''
			@english_url_prefix = '/en'

		end

		def render(context)

			current_lang = context['site.lang']
			variable     = @variable
			url          = ''
			prefix       = ''

			if current_lang != @arabic_slug

				url    = context[variable]
				prefix = @english_url_prefix

			else

				variable = variable.split('.')
				variable[variable.count - 1] = @arabic_prefix + variable[variable.count - 1]

				url    = context[variable.join('.')]
				prefix = @arabic_url_prefix

			end

			if url[0, 4] == 'http'

				return url

			else

				url = prefix + '/' + url

				if (url.index('//'))
					url = url.gsub! '//', '/'
				end

			end

			return url

		end

	end
end

Liquid::Template.register_tag('path', Jekyll::Path)