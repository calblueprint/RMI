## BuildingTypes

large_cube_retail = BuildingType.create({ name: 'Large Cube Retail' })
rockclimbing_eggyolk_inc = BuildingType.create({ name: 'REI' })

# Questions
# -----
# FORMAT
# [<text>, <type>, <array of options>, <array of dependents (or nils)>]

no_dependents = Array.new(3, nil);
safe_maximum = 2 ** 53 - 1

large_cube_retail_questions = [
  ['Describe the kind of cubes you enjoy most.', :free]
  ['How many cubes do you currently have in your building?', :free]
  ['Please provide your three desired cube colors.', :free],
  ['Who manufactures your cubes?', :dropdown, 
    ['Apple', 'Google', 'Samsung'], no_dependents],
  ['During which time slot are you available for a cube inspection?', :dropdown,
    ['12:00-1:00 PM', '1:00-2:00 PM', '2:00-3:00 PM'], no_dependents],
  ['What model are your cubes?', :dropdown,
    ['Model T', 'Corolla', 'Leaf'], no_dependents],
  ['Please specify the amount of faces your cube has.', :range,
    [[0, 6]], no_dependents],
  ['How many corners does your cube have?', :range,
    [[0, 8]], no_dependents],
  ['Please evaluate your cube on a scale of 1-10: 1 = Strongly Disagree, 10 = Strongly Agree', :range,
    [[0, 10]], no_dependents],
  [
    'Do you love your cube?', :dropdown,
    ['Yes.', 'Not really'],
    [[
      'How many times a day do you tell your cube that you love it?', :range,
      [[0, 3], [4, 7], [8, 10]],
      [
        [ 'List some ways you can spend more time with your cube.', :free ],
        [ 'What has been your favorite reaction to affection shown towards your cube?', :free ],
        [ 'Does your cube enjoy the attention?', :dropdown, ['Yes', 'No'], [nil, nil] ]
      ]
    ], nil]
  ]
]

rockclimbing_eggyolk_inc_questions = [
  ['Please provide the name of the rockclimbing gym of your eggyolk\'s choice.', :free],
  [
    'How many years has your eggyolk been rockclimbing?', :range,
    [[0, 2], [3, 5], [6, safe_maximum]],
    [
      ['Has your eggyolk taken lessons?', :free],
      [
        'How does your egg prepare for rockclimbing?', :dropdown,
        ['Hardboiled', 'Scrambled', 'Overeasy'], no_dependents
      ],
      [
        'How many hours a day does your eggyolk spend rockclimbing?', :range,
        [[0, 4], [5, 8], [0, 24]],
        [
          ['Describe your eggyolk\'s work-life balance.', :free],
          ['Is your eggyolk often exhausted?', :dropdown, ['Yes', 'No'], no_dependents],
          nil
        ]
      ]
    ]
  ],
  [
    'Does your eggyolk have any allergies?', :dropdown,
    ['Yes', 'No'],
    [['List any foods your eggyolk may be allergic to.', :free], nil] 
  ],
  ['What is your eggyolk\'s budget on rockclimbing?', :range,
    [[0, 100], [101, 500], [501, safe_maximum]],
    [nil, nil, ['Is your eggyolk employed?', :dropdown, ['Yes', 'No'], no_dependents]]
  ],
  ['Briefly describe how your eggyolk discovered rockclimbing.', :free],
  ['Explain why your eggyolk enjoys rockclimbing, if applicable.', :free],
  ['What kind of shoes does your eggyolk use when rockclimbing?', :dropdown,
    ['Laces', 'Velcro', 'Slipper'], no_dependents
  ]
  ['Which kind of rockclimbing does your eggyolk engage in?', :dropdown,
    ['Bouldering', 'Top Rope Climbing', 'Mountaineering'], no_dependents
  ],
  ['How many shoes does your eggyolk own?', :range, [[0, 10]], no_dependents],
  ['What size shoe is your eggyolk?', :range, [[0, 20]], no_dependents]
]

def generate_question(question, building_type, parent_option=nil)
  if question.nil?
    return
  end
  q_text = question[0]
  q_type = question[1]

  if q_type.equal? :free
    Question.create({
      question_type: :free,
      status: :published,
      text: q_text,
      building_type: building_type,
      parent_option: parent_option
      })
    return
  end

  q_options = question[2]
  q_dependents = question[3]
  if q_type.equal? :dropdown
    q = Question.create({
      question_type: :dropdown,
      status: :published,
      text: q_text,
      building_type: building_type,
      parent_option: parent_option
      })
    q_options.map do |option|
      DropdownOption.create({
        text: option,
        question: q
        })
    end
  end
  if q_type.equal? :range
    q = Question.create({
      question_type: :range,
      status: :published, 
      text: q_text,
      building_type: building_type,
      parent_option: parent_option
      })
    q_options.map do |option|
      RangeOption.create({
        min: option[0],
        max: option[1],
        question: q
        })
    end
  end

  Array(0...q_options.length).each do |i|
    generate_question(q_dependents[i], building_type, q_options[i])
  end
end

large_cube_retail_questions.each { |q| generate_question(q, large_cube_retail) }
rockclimbing_eggyolk_inc_questions.each { |q| generate_question(q, rockclimbing_eggyolk_inc) }

# Locations
# -----
# FORMAT
# [<name>, <address>, <city>, <state>, <zip>]
addresses = [
  ['Unit 1', '2650 Durant Ave', 'Berkeley', :California, 94704],
  ['Northside Cafe', '1878 Euclid Ave', 'Berkeley', :California, 94709],
  ['MLK Student Union', '2560 Bancroft Way', 'Berkeley', :California, 94704],
  ['SMCHS', '22062 Antonio Pkwy', 'Rancho Santa Margarita', :California, 92688],
  ['Monta Vista HS', '21840 McClellan Rd', 'Cupertino', :California, 95014],
  ['Archbishop Mitty', '5000 Mitty Way', 'San Jose', :California, 95129],
  ['The House', '2495 Bancroft Way', 'Berkeley', :California, 94720],
  ['Googleplex', '1600 Amphitheatre Pkwy', 'Mountain View', :California, 94043],
  ['Apple Park', '1 Apple Park Way', 'Cupertino', :California, 95014],
  ['Facebook HQ', '1 Hacker Way', 'Menlo Park', :California, 94025],
  ['Mozilla HQ', '2 Harrison St', 'San Francisco', :California, 94105],
  ['Horizons HQ', '450 9th St', 'San Francisco', :California, 94103],
  ['Little Gem Belgian Waffles', '2468 Telegraph Ave A', 'Berkeley', :California, 94704],
  ['Gypsy\'s Trattoria Italiana', '2519 Durant Ave', 'Berkeley', :California, 94704],
]


# Buildings

