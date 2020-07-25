import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { DirectoryItemContainer } from './directory.styles';

import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';

const Directory = ({ sections }) => {
    return (
      <DirectoryItemContainer>
        {
          sections.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
          ))}
      </DirectoryItemContainer>
    )
}

    

const mapStateToProps = createStructuredSelector({
  sections:selectDirectorySections
})
export default connect(mapStateToProps)(Directory);