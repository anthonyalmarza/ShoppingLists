
monday = List.find_or_create_by(name: 'Monday', created_by: 'veryfakeid', is_default: true)
monday.items.find_or_create_by(name: 'milk', quantity: 1, notes: 'The old milk is probably bad by now')
monday.items.find_or_create_by(name: 'Cake', quantity: 2, notes: 'Why not, right')

random = List.find_or_create_by(name: 'Random', created_by: 'veryfakeid')
random.items.find_or_create_by(name: 'Nintendo switch', quantity: 1)
random.items.find_or_create_by(name: 'Themes', quantity: 10)
random.items.find_or_create_by(name: 'Chips', quantity: 3)
