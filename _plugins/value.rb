module Jekyll
	class Value < Liquid::Tag

		def initialize(tag_name, variable, tokens)

			super
			@variable      = variable
			@arabic_slug   = 'ar'
			@arabic_prefix = 'arabic_'

		end

		def render(context)

			current_lang = context['site.lang']
			variable     = @variable.strip
			suffix       = ''

			if current_lang != @arabic_slug

				return context[variable]

			end
			
			variable = variable.split('.')
			
			if variable[variable.count - 1] == 'content'

				suffix = '_md'

			end

			variable[variable.count - 1] = @arabic_prefix + variable[variable.count - 1] + suffix

			return context[variable.join('.')]

		end

	end
end

Liquid::Template.register_tag('value', Jekyll::Value)