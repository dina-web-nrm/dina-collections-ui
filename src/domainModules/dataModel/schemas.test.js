import { createSystemSchemaValidator } from 'coreModules/error/utilities'

import {
  catalogedUnit,
  featureObservation,
  identification,
  individualGroup,
  occurrence,
  physicalUnit,
} from './schemas'

describe('domainModules/dataModel/schemas', () => {
  describe('catalogedUnit', () => {
    it('rejects catalogUnit with no catalogNumber', () => {
      const validator = createSystemSchemaValidator(catalogedUnit)
      const input = {
        test: 'test',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
    it('accepts catalogUnit with catalogNumber only', () => {
      const validator = createSystemSchemaValidator(catalogedUnit)
      const input = {
        catalogNumber: 'catalogNumber',
      }
      const testResult = validator(input)
      const expectedResult = null

      expect(testResult).toEqual(expectedResult)
    })
    it('accepts catalogUnit with other specified properties', () => {
      const validator = createSystemSchemaValidator(catalogedUnit)
      const input = {
        catalogNumber: 'catalogNumber',
        publishRecord: true,
        storedUnderTaxonName: 'storedUnderTaxonName',
      }
      const testResult = validator(input)
      const expectedResult = null

      expect(testResult).toEqual(expectedResult)
    })
    it('rejects catalogUnit with additionalProperties', () => {
      const validator = createSystemSchemaValidator(catalogedUnit)
      const input = {
        catalogNumber: 'catalogNumber',
        notInSchema: 'notInSchema',
        publishRecord: false,
        storedUnderTaxonName: 'storedUnderTaxonName',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
  })

  describe('featureObservation', () => {
    it('rejects featureObservation with no isOfFeatureObservationTypeId', () => {
      const validator = createSystemSchemaValidator(featureObservation)
      const input = {
        featureObservationText: 'featureObservationText',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
    it('rejects featureObservation with no featureObservationText', () => {
      const validator = createSystemSchemaValidator(featureObservation)
      const input = {
        isOfFeatureObservationTypeId: 1,
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
    it('accepts featureObservation with featureObservationText and isOfFeatureObservationTypeId', () => {
      const validator = createSystemSchemaValidator(featureObservation)
      const input = {
        featureObservationText: 'featureObservationText',
        isOfFeatureObservationTypeId: 1,
      }
      const testResult = validator(input)
      const expectedResult = null

      expect(testResult).toEqual(expectedResult)
    })
    it('rejects featureObservation with additionalProperties', () => {
      const validator = createSystemSchemaValidator(featureObservation)
      const input = {
        featureObservationText: 'featureObservationText',
        isOfFeatureObservationTypeId: 1,
        notInSchema: 'notInSchema',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
  })

  describe('identification', () => {
    it('rejects identification with no identificationText', () => {
      const validator = createSystemSchemaValidator(identification)
      const input = {
        test: 'test',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
    it('accepts identification with identificationText only', () => {
      const validator = createSystemSchemaValidator(identification)
      const input = {
        identificationText: 'identificationText',
      }
      const testResult = validator(input)
      const expectedResult = null

      expect(testResult).toEqual(expectedResult)
    })
    it('rejects identification with additionalProperties', () => {
      const validator = createSystemSchemaValidator(identification)
      const input = {
        identificationText: 'identificationText',
        notInSchema: 'notInSchema',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
  })

  describe('individualGroup', () => {
    it('accepts individualGroup with id only', () => {
      const validator = createSystemSchemaValidator(individualGroup)
      const input = {
        id: 1,
      }
      const testResult = validator(input)
      const expectedResult = null

      expect(testResult).toEqual(expectedResult)
    })
    it('rejects individualGroup with additionalProperties', () => {
      const validator = createSystemSchemaValidator(individualGroup)
      const input = {
        id: 1,
        notInSchema: 'notInSchema',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
  })

  describe('occurrence', () => {
    it('rejects occurrence with unrecognized property', () => {
      const validator = createSystemSchemaValidator(occurrence)
      const input = {
        test: 'test',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
    it('accepts occurrence with specified properties', () => {
      const validator = createSystemSchemaValidator(occurrence)
      const input = {
        collectorsText: 'collectorsText',
        dayEnd: 'dayEnd',
        dayStart: 'dayStart',
        localityText: 'localityText',
        monthEnd: 'monthEnd',
        monthStart: 'monthStart',
        occurrenceDateText: 'occurrenceDateText',
        yearEnd: 'yearEnd',
        yearStart: 'yearStart',
      }
      const testResult = validator(input)
      const expectedResult = null

      expect(testResult).toEqual(expectedResult)
    })
  })

  describe('physicalUnit', () => {
    it('rejects physicalUnit with no physicalUnitText', () => {
      const validator = createSystemSchemaValidator(physicalUnit)
      const input = {
        test: 'test',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
    it('accepts physicalUnit with specified properties', () => {
      const validator = createSystemSchemaValidator(physicalUnit)
      const input = {
        normalStorageLocation: 'normalStorageLocation',
        physicalUnitText: 'physicalUnitText',
      }
      const testResult = validator(input)
      const expectedResult = null

      expect(testResult).toEqual(expectedResult)
    })
    it('rejects physicalUnit with additionalProperties', () => {
      const validator = createSystemSchemaValidator(physicalUnit)
      const input = {
        normalStorageLocation: 'normalStorageLocation',
        notInSchema: 'notInSchema',
        physicalUnitText: 'physicalUnitText',
      }
      const testResult = validator(input)

      expect(testResult).not.toBeNull()
    })
  })
})
