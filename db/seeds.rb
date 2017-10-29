## BuildingTypes
def create_building_types
  $large_cube_retail = BuildingType.create!(name: 'Large Cube Retail')
  $rockclimbing_eggyolk_inc = BuildingType.create!(name: 'REI')
end

# Categories
def create_categories
  other = Category.create!(name: 'Miscellaneous')
  cube_facts = Category.create!(name: 'Basic Information')
  cube_care = Category.create!(name: 'Caring for Your Cube')
  rockclimbing_skill = Category.create!(name: 'Skill Evaluation')
  eggyolk_information = Category.create!(name: 'Personal Information')

  no_dependents = Array.new(3, nil);
  safe_maximum = 2**31 - 1

  $large_cube_retail_questions = [
    ['Describe the kind of cubes you enjoy most.', 'favorite_cubes', cube_facts, :free],
    ['How many cubes do you currently have in your building?', 'num_cubes', cube_facts, :free],
    ['Please provide your three desired cube colors.', 'cube_colors', cube_facts, :free],
    ['Who manufactures your cubes?', 'cube_manufacturer', cube_facts, :dropdown, 
      %w(Apple Google Samsung), no_dependents],
    ['During which time slot are you available for a cube inspection?', 'cube_inspection', cube_facts, :dropdown,
      ['12:00-1:00 PM', '1:00-2:00 PM', '2:00-3:00 PM'], no_dependents],
    ['What model are your cubes?', 'cube_model', cube_facts, :dropdown,
      ['Model T', 'Corolla', 'Leaf'], no_dependents],
    ['Please specify the amount of faces your cube has.', 'num_cube_faces', cube_facts, :range,
      [[0, 6]], no_dependents],
    ['How many corners does your cube have?', 'num_cube_corners', cube_facts, :range,
      [[0, 8]], no_dependents],
    ['Please evaluate your cube on a scale of 1-10: 1 = Strongly Disagree, 10 = Strongly Agree', 'cube_evaluation', cube_care, :range,
      [[0, 10]], no_dependents],
    [
      'Do you love your cube?', 'cube_love', cube_care, :dropdown,
      ['Yes.', 'Not really'],
      [[
        'How many times a day do you tell your cube that you love it?', 'num_cube_love', cube_care, :range,
        [[0, 3], [4, 7], [8, 10]],
        [
          [ 'List some ways you can spend more time with your cube.', 'cube_quality_time', cube_care, :free ],
          [ 'What has been your favorite reaction to affection shown towards your cube?', 'cube_reaction', cube_care, :free ],
          [ 'Does your cube enjoy the attention?', 'cube_attention', cube_care, :dropdown, ['Yes', 'No'], [nil, nil] ]
        ]
      ], nil]
    ]
  ]

  $rockclimbing_eggyolk_inc_questions = [
    ['Please provide the name of the rockclimbing gym of your eggyolk\'s choice.', 'gym_choice', rockclimbing_skill, :free],
    [
      'How many years has your eggyolk been rockclimbing?', 'years_rockclimbing', rockclimbing_skill, :range,
      [[0, 2], [3, 5], [6, safe_maximum]],
      [
        ['Has your eggyolk taken lessons?', 'has_taken_lessons', rockclimbing_skill, :free],
        [
          'How does your egg prepare for rockclimbing?', 'rockclimbing_preparation', rockclimbing_skill, :dropdown,
          ['Hardboiled', 'Scrambled', 'Overeasy'], no_dependents
        ],
        [
          'How many hours a day does your eggyolk spend rockclimbing?', 'hours_spent_rockclimbing', rockclimbing_skill, :range,
          [[0, 4], [5, 8], [0, 24]],
          [
            ['Describe your eggyolk\'s work-life balance.', 'work_life_balance', rockclimbing_skill, :free],
            ['Is your eggyolk often exhausted?', 'is_exhausted', rockclimbing_skill, :dropdown, ['Yes', 'No'], no_dependents],
            nil
          ]
        ]
      ]
    ],
    [
      'Does your eggyolk have any allergies?', 'has_allergies', eggyolk_information, :dropdown,
      ['Yes', 'No'],
      [['List any foods your eggyolk may be allergic to.', 'allergic_to', eggyolk_information, :free], nil] 
    ],
    ['What is your eggyolk\'s budget on rockclimbing?', 'rockclimbing_budget', eggyolk_information, :range,
      [[0, 100], [101, 500], [501, safe_maximum]],
      [nil, nil, ['Is your eggyolk employed?', 'is_employed', eggyolk_information, :dropdown, ['Yes', 'No'], no_dependents]]
    ],
    ['Briefly describe how your eggyolk discovered rockclimbing.', 'rockclimbing_discovery', eggyolk_information, :free],
    ['Explain why your eggyolk enjoys rockclimbing, if applicable.', 'reasons_to_rockclimb', eggyolk_information, :free],
    ['What kind of shoes does your eggyolk use when rockclimbing?', 'rockclimbing_shoes', eggyolk_information, :dropdown,
      ['Laces', 'Velcro', 'Slipper'], no_dependents
    ],
    ['Which kind of rockclimbing does your eggyolk engage in?', 'rockclimbing_types', eggyolk_information, :dropdown,
      ['Bouldering', 'Top Rope Climbing', 'Mountaineering'], no_dependents
    ],
    ['How many shoes does your eggyolk own?', 'num_shoes', eggyolk_information, :range, [[0, 10]], no_dependents],
    ['What size shoe is your eggyolk?', 'shoe_size', eggyolk_information, :range, [[0, 20]], no_dependents]
  ]
end

# Questions
# -----
# FORMAT
# [<text>, <parameter>, <category>, <type>, <array of options>, <array of dependents (or nils)>]

def generate_question(question, building_type, parent_option=nil)
  if question.nil?
    return
  end

  q_text = question[0]
  q_parameter = question[1]
  q_category = question[2]
  q_type = question[3]
  q_options = question[4]
  q_dependents = question[5]

  q = Question.create!(
    question_type: q_type,
    status: :published,
    text: q_text,
    building_type: building_type,
    category: q_category,
    parameter: q_parameter
  )

  unless parent_option.nil?
    q.parent_option = parent_option
    q.save!
  end

  if q_type.equal? :free
    return
  end

  if q_type.equal? :dropdown
    q_options_saved = q_options.map do |option|
      DropdownOption.create!(
        text: option,
        question: q
      )
    end
  end
  if q_type.equal? :range
    q_options_saved = q_options.map do |option|
      RangeOption.create!(
        min: option[0],
        max: option[1],
        question: q
      )
    end
  end

  Array(0...q_options_saved.length).each do |i|
    generate_question(q_dependents[i], building_type, q_options_saved[i])
  end
end

def create_questions
  $large_cube_retail_questions.each_with_index do |q, i|
    print("\rCreating #{$large_cube_retail.name}"\
    " Question #{i + 1}/#{$large_cube_retail_questions.length}...")
    generate_question(q, $large_cube_retail)
  end

  print("\n")

  $rockclimbing_eggyolk_inc_questions.each_with_index do |q, i|
    print("\rCreating #{$rockclimbing_eggyolk_inc.name}"\
    " Question #{i + 1}/#{$rockclimbing_eggyolk_inc_questions.length}...")
    generate_question(q, $rockclimbing_eggyolk_inc)
  end

  print("\n")
end

$people = [
['Test', 'RMI', 'rmi@test.com', '18005558888', 'password'],
['Eleanore', 'Donnelly', 'raleigh.hammes@berkeley.edu', '16877036527', '^Vbf=Dtst('],
['Orland', 'Johns', 'laurence.spence@berkeley.edu', '18451135957', '}jylKd71Z4n-^Gh'],
['Miss', 'Winifred', 'qvolkman@berkeley.edu', '11706668976', '`j)L]$_~A];Qk'],
['Jermey', 'Klocko', 'christiansen.vi@berkeley.edu', '18889991010', 'ARpil]n|s%#2Kxs*r'],
['Garrick', 'Armstrong', 'nat99@berkeley.edu', '18889991010', 'Y.;1#f-UilR:D/'],
['Prof.', 'Golden', 'schiller.vivien@berkeley.edu', '18889991010', 'QZ`_42v#J;R91)s_x'],
['Mr.', 'Henri', 'quinten59@berkeley.edu', '14328287160', ':BJ{KqA8$lNmMR[*/'],
['Joanny', 'Hansen', 'barrows.erna@berkeley.edu', '18889991010', 'mBqa%k6zL3+Pi+K7?'],
['Alanis', 'Rempel', 'csatterfield@berkeley.edu', '18889991010', '1Bq]7nNk)*w5'],
['Gennaro', 'Simonis', 'zmitchell@berkeley.edu', '114050090458', 'fLN-X_j[n`9LnZz'],
['Dr.', 'Donato', 'cory.rempel@berkeley.edu', '18889991010', 'wwhox/8|_}HN'],
['Dr.', 'Brielle', 'fredrick.kuhic@berkeley.edu', '11512248619', ')&syqTeJh]E'],
['Lexi', 'Berge', 'johnny33@berkeley.edu', '110895664254', '9VHZ3+0a)S%]'],
['Dr.', 'Adrain', 'uhoppe@berkeley.edu', '111846821714', 'IOAI*=5SXw0Y'],
['Jarret', 'Schuppe', 'smarquardt@berkeley.edu', '13683518803', 'ExZB1/N6_#-D7yK('],
['Melba', 'Moen', 'goyette.dedric@berkeley.edu', '18889991010', 'j!b]J_p8,OHHm'],
['Test', 'Asset Manager', 'ass@test.com', '18005558888', 'password'],
['Elisha', 'Kunde', 'cristobal74@berkeley.edu', '15808548569', 'AM+%fU*Z@jo~hMk'],
['Leslie', 'Rowe', 'rhane@berkeley.edu', '18889991010', ']4tModt6hcU?'],
['Karson', 'Cronin', 'chester25@berkeley.edu', '18889991010', 'S5&mk]cglC|`S('],
['Jerad', 'Gulgowski', 'drew99@berkeley.edu', '17906026970', 'OLyu|iX7{~'],
['Consuelo', 'Schaden', 'linnie90@berkeley.edu', '18889991010', '@PUuq}1m{22eEni,-H%'],
['Osborne', 'Lockman', 'jensen.satterfi@berkeley.edu', '14708275094', 'tmd(|$Z.9g$m9'],
['Dr.', 'Gust', 'kamryn92@berkeley.edu', '16093469117', '4~;X|=P27G,HN*cC'],
['Melvin', 'Denesik', 'deonte.rempel@berkeley.edu', '18889991010', 'vg7$}D`e;j'],
['Aliza', 'Feil', 'geichmann@berkeley.edu', '17632048530', 'Y#1,tF+*E!O7k'],
['Roslyn', 'Bernhard', 'kertzmann.terry@berkeley.edu', '12523656313', 'Zjv~GsY5tU!&'],
['Prof.', 'Johnathon', 'cgulgowski@berkeley.edu', '18889991010', '!7)w88p1gRmeqIci.'],
['Mrs.', 'Kaya', 'mariano.dickens@berkeley.edu', '18889991010', '~3ML9z7-W|k,3Eq]'],
['Nelda', 'Farrell', 'emmanuelle98@berkeley.edu', '18889991010', '#+Z%15_gT?#==q@tlP@'],
['Mr.', 'Terrill', 'conor.predovic@berkeley.edu', '17357877308', 'dj}wdd:(m5pt;pRR'],
['Albin', 'Franecki', 'gusikowski.camr@berkeley.edu', '18889991010', 'r/{#7U]=_fxb^*g'],
['Prof.', 'Shayne', 'derick.wilderma@berkeley.edu', '14497740519', 'gySl11O@wDxr'],
['Test', 'Building Operator', 'op@test.com', '18005558888', 'password'],
['Eleazar', 'Paucek', 'judy.howell@berkeley.edu', '14294080787', 'XY6P.@(9SNAs'],
['Madilyn', 'Schoen', 'delta.smith@berkeley.edu', '18889991010', '!dgz,^n$=MS|HFw8JP'],
['Dr.', 'Woodrow', 'bogan.gisselle@berkeley.edu', '18889991010', '_AlwAS)Y4t;nU7Ue'],
['Hortense', 'Schaefer', 'mayert.conor@berkeley.edu', '14848860229', '{''M,kIw)@PIoc'],
['Larissa', 'Thiel', 'kristofer.carte@berkeley.edu', '17517074903', 'gctu`b*Dt'],
['Tierra', 'Ziemann', 'rodolfo.cruicks@berkeley.edu', '18889991010', '~d?EklM?:r;lHbhN'],
['Nicole', 'Fritsch', 'annamarie58@berkeley.edu', '17921564776', 'BZPThc0f$RA'],
['Dexter', 'Koelpin', 'ycummerata@berkeley.edu', '15422438089', '*7[8}T&EZ{^|'],
['Kara', 'Johns', 'nathaniel.sauer@berkeley.edu', '15875642877', '!O|t;@+b&gCh4O_O'],
['Buck', 'Boehm', 'spinka.craig@berkeley.edu', '16883921783', 'IhEgW$5*:kxMF$-3n#L0'],
['Dr.', 'Javonte', 'xhane@berkeley.edu', '18889991010', '#m|x/;&XU'],
['Kenyatta', 'Lockman', 'cklein@berkeley.edu', '18889991010', 'KdZf^ibKX7[.WKm2tb5'],
['Lewis', 'Gutmann', 'jerald31@berkeley.edu', '18889991010', '0g@]t$JMJ6Dvb&SR'],
['August', 'Trantow', 'johnnie62@berkeley.edu', '18889991010', '3a)1E/%!Ov'],
['Triston', 'Rohan', 'oconnell.jasper@berkeley.edu', '12907201773', '*wuq+3hd`eJ6I&=FwU'],
['Merle', 'Effertz', 'barrows.ona@berkeley.edu', '18889991010', 'CXl+`q6sEV3igp']
]

def person(p)
  {
    first_name: p[0],
    last_name: p[1],
    email: p[2],
    phone: p[3],
    password: p[4],
    password_confirmation: p[4]
  }
end

def create_users
  users_per_type = $people.length / 3

  # RMI Users
  $rmi_users = $people[0..1 * users_per_type].each_with_index.map do |p, i|
    print("\rCreating RMI User #{i}/#{users_per_type}...")
    RmiUser.create(person(p))
  end

  print("\n")

  # Asset Manager Users
  $asset_managers = $people[1 * users_per_type..2 * users_per_type].each_with_index.map do |p, i|
    print("\rCreating Asset Manager #{i}/#{users_per_type}...")
    AssetManager.create(person(p))
  end

  print("\n")

  # Building Operator Users
  $building_operators = $people[2 * users_per_type..3 * users_per_type].each_with_index.map do |p, i|
    print("\rCreating Building Operator #{i}/#{users_per_type}...")
    BuildingOperator.create(person(p))
  end
end

# Locations
# -----
# FORMAT
# [<name>, <address>, <city>, <state>, <zip>]
$addresses = [
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
  ['People\'s Park', '2556 Haste St', 'Berkeley', :California, 94704],
]

def generate_location(l)
  {
    name: l[0],
    address: l[1],
    city: l[2],
    state: l[3],
    zip: l[4]
  }
end

# Portfolios
def create_portfolios
  $portfolios = $asset_managers.map do |a|
    Portfolio.create!({ name: a.first_name + "'s Portfolio", asset_manager: a })
  end
  print("\n")
end

# Buildings
def create_buildings
  Array(0...$portfolios.length).each_with_index do |i, portfolio_index|
    print("Creating Portfolio #{portfolio_index}/#{$portfolios.length - 1}")
    portfolio = $portfolios[i]
    asset_manager = portfolio.asset_manager

    print("\n")
    Array(0...$addresses.length).each_with_index do |j, building_index|
      print("\r- Creating Building #{building_index}/#{$addresses.length - 1}")
      location = generate_location($addresses[j])
      building = Building.new(
        portfolio: portfolio,
        name: location[:name],
        address: location[:address],
        city: location[:city],
        state: location[:state],
        zip: location[:zip]
      )

      building.building_type = if j.even?
                                 $large_cube_retail
                               else
                                 building.building_type = $rockclimbing_eggyolk_inc
                               end

      building.save!
    end
    print("\n")
  end
end

create_building_types
create_categories
create_questions
create_users
create_portfolios
create_buildings
