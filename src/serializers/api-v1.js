export const GuestSerializer = {
  key: 'guest',
  opts: {
    attributes: [
      'id',
      'favorite_topic_ids',
      'remaining_score',
      'total_score',
      'created_at',
      'updated_at',
    ],
    keyForAttribute: 'underscore_case',
  },
}