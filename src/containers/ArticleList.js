import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'
import { loadAllArticles } from '../actions'
import Article from '../components/Article/';
import articleOpen from '../decorators/oneOpen'
import { deleteArticle } from '../actions'
import ArticlesLinks from '../components/ArticleList'

class ArticleList extends Component {
    componentDidMount() {
        const { loadAllArticles, loading, loaded } = this.props;
        if (!loaded && !loading) loadAllArticles()
    }
    
    render() {
        if (this.props.loading) {
            return (<h2>'Loading...'</h2>)
        }
        
        if (!this.props.articles) {
            return (
                <div>There is no articles...</div>
            )
        }
        
        let listItems = _.filter(this.props.articles, this.isArticleEqaulToSelected.bind(this.props))
        if (this.isRangeDaysBothExists(this.props.day)) {
            listItems = _.filter(listItems, (article) => {
                return this.isArticleCreatedInRangeOfDates(article, this.props.day);
            })
        }
        
        return (
            <div> 
                <ArticlesLinks articles = {listItems}/> 
                {this.props.children}
            </div>
        )
    }
    
    isArticleCreatedInRangeOfDates(article, date) {
        let dateOfCreate = new Date(article.date);
        
        return (!date.from && (dateOfCreate - date.from) === 0) ||
        (!date.to && (dateOfCreate - date.to) === 0) ||
        ((date.from <= dateOfCreate) && (dateOfCreate <= date.to))
    }
    
    isRangeDaysBothExists(days) {
        return !(!days.to && !days.from)
    }
    
    isArticleEqaulToSelected(article) {
        return this.selectedArticles.length ?
            _.find(this.selectedArticles, { label: article.title })
            : true;
    }
}

export default connect((state) => {
    return {
        loaded: state.articles.articles.get('loaded'),
        loading: state.articles.articles.get('loading'),
        articles: state.articles.articles.get('entities').toArray(),
        selectedArticles: state.articles.selectedArticles,
        day: state.filters.day
    }
}, {
    deleteArticle,
    loadAllArticles
})(articleOpen(ArticleList))
