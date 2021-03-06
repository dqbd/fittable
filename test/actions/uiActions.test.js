import test from 'blue-tape'
import { SIDEBAR_DISPLAY, EVENT_DISPLAY } from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/uiActions'

test('displaySidebar()', t => {
  const expected = {type: SIDEBAR_DISPLAY, payload: {sidebar: 'search'}}
  const actual = actions.displaySidebar('search')
  t.deepEqual(actual, expected)
  t.end()
})

test('displayEvent()', t => {
  const expected = {type: EVENT_DISPLAY, payload: {eventId: 154}}
  const actual = actions.displayEvent(154)
  t.deepEqual(actual, expected)
  t.end()
})
