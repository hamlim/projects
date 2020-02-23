## Tasks

### Features:

- Lists of todos
- Searchable
- Tags for todos
- Due dates
- Notes on each todo
- Sub tasks for each todo

### Data Structure:

```json
{
  id: Number,
  text: String,
  status: 'pending' | 'in progress' | 'done',
  notes: String,
  dateCreated: Date,
  dateDue: Date,
  // Stored as JSON stringified text
  tasks: Array<{checked: Boolean, text: String}>,
  // Storered as JSON stringified text
  tags: Array<String>
}
```
