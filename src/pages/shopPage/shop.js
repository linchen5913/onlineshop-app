import React,{ useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';
import CollectionsOverview from '../../components/collections-overview/colelctions-overview';
import CollectionPage from '../collection/collection';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import  WithSpinner from '../../components/with-spinner/with-spinner';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage); 

const ShopPage = ({ fetchCollectionsStart, match, isCollectionsLoaded, isCollectionFetching}) => {

    useEffect(() => {
        fetchCollectionsStart();
    },[fetchCollectionsStart])



        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/> } />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} />
            </div>
        );
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);