import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner';

import { ShopContainer } from './shop.styles';

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner';


const CollectionsOverview = lazy(() => import('../../components/collections-overview/collections-overview'));
const CollectionPage = lazy(() => import('../collection/collection'));

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage); 

const ShopPage = ({ fetchCollectionsStart, match, isCollectionsLoaded, isCollectionFetching}) => {

    useEffect(() => {
        fetchCollectionsStart();
    },[fetchCollectionsStart])

    return (
        <ShopContainer>
            <Suspense fallback={<Spinner />}>
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}
                />
            </Suspense>
        </ShopContainer>
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