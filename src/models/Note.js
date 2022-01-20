import { Model } from '@vuex-orm/core'
import SubNote from './SubNote'

export default class Note extends Model {
  static entity = 'notes'

  static fields () {
    return {
      id: this.attr(null),
      body: this.attr(''),
      user_id: this.attr(null),
      sub_notes: this.hasMany(SubNote, 'note_id')
    }
  }
}
