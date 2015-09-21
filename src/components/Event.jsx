/**
 * Component representing the event.
 */

import React, { PropTypes } from 'react'
import CP from 'counterpart'
import Moment from 'moment'

import EventDetail from './EventDetail'

const propTypes = {
  onViewChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  linkNames: PropTypes.object,
  colored: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.number,
    course: PropTypes.string,
    appear: PropTypes.string,
    type: PropTypes.string,
  }),
}

const defaultProps = {
  detailShown: false,
}

class EventBox extends React.Component {

  style (props) {

    var length = `${props.data._draw_length * 100}%`
    var position = `${props.data._draw_position * 100}%`
    return {
      width: length,
      height: length,
      left: position,
      top: position,
    }
  }

  minimalization (drawLength) {

    // Determine amount of needed minimalization of text elements in box by its length
    if (drawLength <= 0.12) {
      return 'min-light'
    }
    if (drawLength <= 0.10) {
      return 'min-hard'
    }
    if (drawLength <= 0.07) {
      return 'min-all'
    }
  }

  classNames (props) {

    let cls = ['event', props.data.appear, this.minimalization(props.data._draw_length)]
    if (props.detailShown) {
      cls.push('detail-shown')
    }
    if (props.data.cancelled) {
      cls.push('cancelled')
    }
    if (props.openFromBottom) {
      cls.push('from-bottom')
    }
    if (props.data.replacement) {
      cls.push('replacement')
    }

    if (props.colored) {
      cls.push(`color-${props.data.type}`)
    }

    return cls.join(' ')
  }

  displayTime (props) {

    var startsAt = new Moment(this.props.data.startsAt).format('LT')
    var endsAt = new Moment(this.props.data.endsAt).format('LT')

    if (props.detailShown) {
      return `${startsAt}—${endsAt}`
    } else {
      return `${startsAt}`
    }
  }

  render () {
    const {appear, id} = this.props.data
    const onClickVal = this.props.detailShown ? null : id

    return (
      <div
        className={this.classNames(this.props)}
        data-event={id}
        style={this.style(this.props)}
      >
        <div className="inner">
          <div
            className="head-space"
            onClick={this.props.onClick.bind(null, onClickVal)}>
          </div>
          <div className="name">
            {this.props.data.course}
          </div>
          <div className="time">
            {this.displayTime(this.props)}
          </div>
          <div className="type">
            <span className={`short ${this.props.colored ? ' hide' : ''}`}>
              {CP.translate('event_type_short.' + this.props.data.type)}
            </span>
          </div>
          <EventDetail
             ref="detail"
             data={this.props.data}
             onViewChange={this.props.onViewChange}
             linkNames={this.props.linkNames}
          />
          <div className="cancelflag">
            <i className="fa fa-ban"></i>
          </div>
          <div className="replaceflag">
            <i className="fa fa-plus"></i>
          </div>
        </div>
      </div>
    )
  }
}

EventBox.propTypes = propTypes
EventBox.defaultProps = defaultProps

export default EventBox
