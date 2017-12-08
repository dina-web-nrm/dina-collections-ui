import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { Translate } from 'coreModules/i18n/components'
import { MammalForm } from 'domainModules/collectionMammals/components'
import {
  actionCreators as mammalActionCreators,
  globalSelectors as mammalSelectors,
} from 'domainModules/collectionMammals'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapStateToProps = (state, { match }) => {
  return {
    individualGroup: mammalSelectors.getIndividualGroupByCatalogNumber(
      state,
      match.params.catalogNumber
    ),
  }
}
const mapDispatchToProps = {
  getIndividualGroupByCatalogNumber:
    mammalActionCreators.getIndividualGroupByCatalogNumber,
  updateIndividualGroup: mammalActionCreators.updateIndividualGroup,
}

const propTypes = {
  getIndividualGroupByCatalogNumber: PropTypes.func.isRequired,
  individualGroup: PropTypes.shape({
    // TODO: define and possibly centralize propTypes for individualGroup
    attributes: PropTypes.shape({
      identifications: PropTypes.arrayOf(
        PropTypes.shape({
          identifiedTaxonNameStandardized: PropTypes.string,
        })
      ).isRequired,
      physicalUnits: PropTypes.arrayOf(
        PropTypes.shape({
          catalogedUnit: PropTypes.shape({
            catalogNumber: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }),
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      catalogNumber: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateIndividualGroup: PropTypes.func.isRequired,
}
const defaultProps = {
  individualGroup: undefined,
}

class EditMammal extends Component {
  componentWillMount() {
    this.props.getIndividualGroupByCatalogNumber(
      this.props.match.params.catalogNumber,
      {
        include: [
          'identifications',
          'featureObservations.featureObservationType',
          'occurrences',
          'physicalUnits.catalogedUnit',
        ].join(),
      }
    )
  }

  render() {
    const { individualGroup, updateIndividualGroup } = this.props

    return (
      <PageTemplate>
        <h1>
          <Translate textKey="modules.editMammal.editMammal" />
        </h1>
        <Grid textAlign="left" verticalAlign="middle">
          <Grid.Column>
            <MammalForm
              handleFormSubmit={updateIndividualGroup}
              individualGroupAttributes={
                individualGroup && individualGroup.attributes
              }
              individualGroupId={individualGroup && individualGroup.id}
            />
          </Grid.Column>
        </Grid>
      </PageTemplate>
    )
  }
}

EditMammal.propTypes = propTypes
EditMammal.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(EditMammal)
