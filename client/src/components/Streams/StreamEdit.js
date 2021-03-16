import React from 'react';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux';


class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    render() {
        return <div>StreamEdit</div>
    }
}


const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchStream })(StreamEdit);