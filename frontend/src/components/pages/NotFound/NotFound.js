import MainLayout from '../../layouts/MainLayout';
import React from 'react';

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainLayout>
                Not Found
            </MainLayout>
        );
    }
}
