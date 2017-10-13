# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


large_cube_retail = BuildingType.create({ name: 'Large Cube Retail' })
rockclimbing_eggyolk_inc = BuildingType.create({ name: 'REI' })

free_questions: [
  'Describe the kind of cubes you enjoy most.',
  'How many cubes do you currently have in your building?',
  'Please provide your three desired cube colors.'
]

dropdown_questions: [
  ['Who manufactures your cubes?', 'Apple', 'Google', 'Samsung'],
  ['During which time slot are you available for a cube inspection?', '12:00-1:00 PM', '1:00-2:00 PM', '2:00-3:00 PM']
  ['What model are your cubes?', 'Model T', ''
]


questions = Question.create([{
  question_type: :free,
  status: :published,
  text: ,
  building_type: large_cube_retail
}, {
  question_type: :free,
  status: :published,
  text: ,
  building_type: large_cube_retail
}, {
  question_type: :free,
  status: :published,
  text: 
  building_type: large_cube_retail
}, {
  question_type: :dropdown,
  status: :published,
  text: 
}]

