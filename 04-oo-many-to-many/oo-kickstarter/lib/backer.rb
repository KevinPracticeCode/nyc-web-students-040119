require 'pry'

class Backer
  attr_reader :name, :backed_projects

  def initialize(name)
    @name = name
    @backed_projects = []
  end

  def back_project(project)
    self.backed_projects << project

    project.add_backer(self)
  end

end

Backer.new("alex", 10)
Backer.new("alex", 50)