## Cash

### Features:

- Transactions
- Searchable

### Data Structure:

```json
{
  id: Number,
  amount: Number,
  account: String,
  notes: String,
  dateCreated: Date,
  location: String,
  // Storered as JSON stringified text
  tags: Array<String>,
  receipt: Array<Attachment>,
}
```
