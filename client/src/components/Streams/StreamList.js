import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = (streams) => {
        if (streams.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${streams.id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${streams.id}`} className="ui negative button">
                        Delete
                    </Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(streams => {
            return (
                <div className="item" key={streams.id}>
                    {this.renderAdmin(streams)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <Link to={`/streams/${streams.id}`} className="header">
                            {streams.title}
                        </Link>
                        <div className="description">
                            {streams.description}
                        </div>
                    </div>

                </div>
            )
        })
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                    {this.renderCreate()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps,
    { fetchStreams })(StreamList);