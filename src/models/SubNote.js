import { Model } from '@vuex-orm/core'
import Note from './Note'

export default class SubNote extends Model {
  static entity = 'sub_notes'

  static fields () {
    return {
      id: this.attr(null),
      note: this.attr(''),
      note_id: this.attr(null),
      user_id: this.attr(null),
      body: this.belongsTo(Note, 'note_id')
    }
  }
}
