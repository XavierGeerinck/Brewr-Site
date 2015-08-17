/**
 * Created by Maxim on 17/08/2015.
 */
import React from 'react';


export default class BaseComponent extends React.Component {

    // bind functions to it's component by using this._bind('functionName', 'functionName2', ...) on extending
    // With React.createClass, every non-lifecycle method is auto bound to component instance, not with ES6!
    _bind(...methods) {
        methods.forEach((method) => this[method] = this[method].bind(this));
    }
}