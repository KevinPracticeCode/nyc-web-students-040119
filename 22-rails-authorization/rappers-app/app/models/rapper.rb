class Rapper < ApplicationRecord
  has_many :songs
  has_many :favorites
  has_many :users, through: :favorites
  # validates :name, presence: true, uniqueness: true
  # validates :age, numericality: { only_integer: true }
  # validate :get_a_new_hobby
  #
  # def get_a_new_hobby
  #   if self.age > 40
  #     errors.add(:age, "get a new hobby")
  #   end
  # end

end
