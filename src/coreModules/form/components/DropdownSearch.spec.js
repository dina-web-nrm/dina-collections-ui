/* eslint-disable no-console */
import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'
import DropdownSearch from './DropdownSearch'

let counter = 1
const getUniqueValue = (asNumber = false) => {
  counter += 1

  return asNumber ? counter : String(counter)
}
const optionFactory = (value = getUniqueValue()) => {
  return { key: value, text: value, value }
}

describe('coreModules/form/components/DropdownSearch', () => {
  let onChange
  let onSearchChange

  beforeEach(() => {
    onChange = jest.fn()
    onSearchChange = jest.fn()
  })

  it('renders without crashing', () => {
    setupTestComponent({
      component: (
        <DropdownSearch
          input={{ name: 'name' }}
          meta={{ touched: false }}
          onChange={onChange}
          onSearchChange={onSearchChange}
          options={[optionFactory()]}
        />
      ),
      mount: true,
    })
  })

  it('contains provided options', () => {
    const { rootComponent: mountedComponent } = setupTestComponent({
      component: (
        <DropdownSearch
          input={{ name: 'name' }}
          meta={{ touched: false }}
          onChange={onChange}
          onSearchChange={onSearchChange}
          options={[optionFactory('ABC'), optionFactory('BCD')]}
          selectOnBlur
        />
      ),
      fullExport: true,
      mount: true,
    })

    const DropdownItems = mountedComponent.find('DropdownItem')
    expect(DropdownItems.length).toBe(2)

    const spans = DropdownItems.find('span')
    const firstValue = spans.first()
    const lastValue = spans.last()
    expect(firstValue.text()).toBe('ABC')
    expect(lastValue.text()).toBe('BCD')
  })

  it('selects on blur without change', () => {
    const { rootComponent: mountedComponent } = setupTestComponent({
      component: (
        <DropdownSearch
          input={{ name: 'name' }}
          meta={{ touched: false }}
          onChange={onChange}
          onSearchChange={onSearchChange}
          options={[optionFactory('ABC'), optionFactory('BCD')]}
          selectOnBlur
        />
      ),
      fullExport: true,
      mount: true,
    })

    const Dropdown = mountedComponent.find('Dropdown')
    Dropdown.simulate('focus')
    Dropdown.simulate('blur')
    const selectedValue = Dropdown.children().childAt(1)
    expect(selectedValue.text()).toBe('ABC')
  })

  // it('does not select on blur without change', () => {
  //   const { rootComponent: mountedComponent } = setupTestComponent({
  //     component: (
  //       <DropdownSearch
  //         input={{ name: 'name' }}
  //         meta={{ touched: false }}
  //         onChange={onChange}
  //         onSearchChange={onSearchChange}
  //         options={[optionFactory('ABC'), optionFactory('BCD')]}
  //         selectOnBlur={false}
  //       />
  //     ),
  //     fullExport: true,
  //     mount: true,
  //   })

  //   const Dropdown = mountedComponent.find('Dropdown')
  //   Dropdown.simulate('focus')
  //   Dropdown.simulate('blur')
  //   const selectedValue = Dropdown.children().childAt(1)
  //   expect(selectedValue.text()).toBe('')
  // })

  it('changes value', () => {
    const { rootComponent: mountedComponent } = setupTestComponent({
      component: (
        <DropdownSearch
          input={{ name: 'name', value: '' }}
          meta={{ touched: false }}
          onChange={(e, b) => {
            onChange()
            console.log(e.target.value)
            console.log(b)
            return e.target.value
          }}
          onSearchChange={onSearchChange}
          options={[optionFactory('ABC'), optionFactory('BCD')]}
          selectOnBlur
        />
      ),
      fullExport: true,
      mount: true,
    })

    const Dropdown = mountedComponent.find('Dropdown')
    console.log(Dropdown.debug())
    Dropdown.simulate('change', { target: { value: 'BCD' } })
    console.log(Dropdown.debug())
    expect(onChange.mock.calls.length).toBe(1)
  })
})
