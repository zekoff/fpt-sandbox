import React from 'react';

class Inventory extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return <p>{this.props.inventory}</p>
    }
}

export default Inventory;