require 'fileutils'
require 'find'
module Jekyll

  class ProjectsIndex < Page
    def initialize(site, base, dir)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'projects.html')
      #self.data['category'] = category

      #category_title_prefix = site.config['category_title_prefix'] || 'Category: '
      #self.data['title'] = "#{category_title_prefix}#{category}"


      projects=Array.new;
      site.pages.each{ |page|
        path     = page.subfolder + '/' + page.name
        print path
        mod_date = File.mtime(site.source + path)

        # Ignore SASS, SCSS, and CSS files
        if page.subfolder=~/projects/
            unless page.name=~/index/
              print page.name
              projects << page
            end
        end
      }

      self.data['projects'] = projects
      self.data['title'] = "Projects"
    end
  end

  class CategoryGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'projects'
        dir = site.config['projects_dir'] || 'projects'
        write_projects_index(site, dir)

      end
    end

    def write_projects_index(site, dir)
      index = ProjectsIndex.new(site, site.source, dir)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end

end