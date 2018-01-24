module Jekyll
	class Target < Liquid::Tag

		def initialize(tag_name, variable, tokens)

			super
			@variable = variable

		end

		def render(context)

			open_new_tab = Liquid::Template.parse(@variable).render context
			open_new_tab = open_new_tab.strip

			if open_new_tab == 'true'

				return 'target="_blank"'

			end

		end

	end
end

Liquid::Template.register_tag('target', Jekyll::Target)