import { action, computed, IObservableValue } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { spring, TransitionMotion } from 'react-motion';
import createFilterOptions from 'react-select-fast-filter-options';
import VSelect from 'react-virtualized-select';

import UIStore from 'stores/ui/reference-list';
import { MenuActionType } from 'utils/constants';

import Button from 'components/button';
import * as Styles from './menu.scss';

type MenuButtonKind =
    | MenuActionType.DESTROY_PROCESSOR
    | MenuActionType.INSERT_STATIC_BIBLIOGRAPHY
    | MenuActionType.OPEN_IMPORT_DIALOG
    | MenuActionType.REFRESH_PROCESSOR;

interface StyleTypeChange {
    kind: MenuActionType.CHANGE_STYLE;
    data: string;
}

interface MenuButtonClick {
    kind: MenuButtonKind;
}

export type MenuAction = StyleTypeChange | MenuButtonClick;

interface Props {
    ui: UIStore;
    cslStyle: IObservableValue<string>;
    onSubmit(action: MenuAction): void;
}

interface StyleOption {
    id: string;
    label: string;
    value: string;
}

const openedStyle = [
    {
        key: 'menu',
        style: {
            height: spring(85, { stiffness: 300, damping: 20 }),
            scale: spring(1, { stiffness: 300, damping: 20 }),
        },
    },
];

const filterOptions = createFilterOptions({
    options: window.ABT.styles.styles,
});

@observer
export default class Menu extends React.Component<Props> {
    static readonly labels = top.ABT.i18n.referenceList.menu;
    static filterOptions = filterOptions;

    static willEnter(): { height: number; scale: number } {
        return {
            height: 0,
            scale: 0,
        };
    }

    static willLeave(): any {
        return {
            height: spring(0, { stiffness: 300, damping: 25 }),
            scale: spring(0, { stiffness: 300, damping: 25 }),
        };
    }

    readonly styles: StyleOption[];

    @computed
    get selected(): { label: string; value: string } {
        return {
            label: this.styles.find(d => d.id === this.props.cslStyle.get())!
                .label,
            value: this.props.cslStyle.get(),
        };
    }

    constructor(props: Props) {
        super(props);
        const { styles } = top.ABT.styles;

        /**
         * ABT_Custom_CSL.value is `null` if there is either no provided file path
         * or if the path to the file is invalid.
         */
        if (!top.ABT.custom_csl.value) {
            this.styles = styles;
        } else {
            this.styles = [
                {
                    label: Menu.labels.styleLabels.custom,
                    value: 'header',
                    id: 'header',
                },
                {
                    label: top.ABT.custom_csl.label,
                    value: top.ABT.custom_csl.value,
                    id: top.ABT.custom_csl.value,
                },
                {
                    label: Menu.labels.styleLabels.predefined,
                    value: 'header',
                    id: 'header',
                },
                ...styles,
            ];
        }
    }

    @action
    toggleMenu = (): void => {
        this.props.ui.menuOpen = false;
    };

    handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        this.toggleMenu();
        const menuAction: MenuAction = {
            kind: e.currentTarget.id as MenuButtonKind,
        };
        this.props.onSubmit(menuAction);
    };

    handleSelect = (data: StyleOption | never[]): void => {
        if (Array.isArray(data)) return;
        const menuAction: MenuAction = {
            kind: MenuActionType.CHANGE_STYLE,
            data: data.value,
        };
        this.props.onSubmit(menuAction);
        this.forceUpdate();
    };

    render(): JSX.Element {
        const transitionStyle = this.props.ui.menuOpen ? openedStyle : [];
        return (
            <TransitionMotion
                willLeave={Menu.willLeave}
                willEnter={Menu.willEnter}
                styles={transitionStyle}
            >
                {(transitionStyles): any =>
                    transitionStyles.length > 0
                        ? ((
                              <div
                                  key={transitionStyles[0].key}
                                  className={Styles.menu}
                                  style={{
                                      height: transitionStyles[0].style.height,
                                      maxHeight:
                                          transitionStyles[0].style.height,
                                      opacity:
                                          transitionStyles[0].style.opacity,
                                      transform: `scaleY(${
                                          transitionStyles[0].style.scale
                                      })`,
                                      transformOrigin: 'top',
                                  }}
                              >
                                  <div className={Styles.subpanel}>
                                      <Button
                                          flat
                                          id={MenuActionType.OPEN_IMPORT_DIALOG}
                                          icon="media-code"
                                          label={Menu.labels.tooltips.importRIS}
                                          tooltip={{
                                              text:
                                                  Menu.labels.tooltips
                                                      .importRIS,
                                              position: 'bottom',
                                          }}
                                          onClick={this.handleClick}
                                      />
                                      <Button
                                          flat
                                          id={MenuActionType.REFRESH_PROCESSOR}
                                          icon="update"
                                          label={Menu.labels.tooltips.refresh}
                                          tooltip={{
                                              text:
                                                  Menu.labels.tooltips.refresh,
                                              position: 'bottom',
                                          }}
                                          onClick={this.handleClick}
                                      />
                                      <Button
                                          flat
                                          id={MenuActionType.DESTROY_PROCESSOR}
                                          icon="trash"
                                          label={Menu.labels.tooltips.destroy}
                                          tooltip={{
                                              text:
                                                  Menu.labels.tooltips.destroy,
                                              position: 'bottom',
                                          }}
                                          onClick={this.handleClick}
                                      />
                                      <Button
                                          flat
                                          disabled={!this.props.ui.selected}
                                          id={
                                              MenuActionType.INSERT_STATIC_BIBLIOGRAPHY
                                          }
                                          icon="list-view"
                                          label={
                                              Menu.labels.tooltips.staticPubList
                                          }
                                          tooltip={{
                                              text:
                                                  Menu.labels.tooltips
                                                      .staticPubList,
                                              position: 'bottom',
                                          }}
                                          onClick={this.handleClick}
                                      />
                                      <Button
                                          flat
                                          href="https://github.com/dsifford/academic-bloggers-toolkit/wiki"
                                          role="link"
                                          icon="editor-help"
                                          label={Menu.labels.tooltips.help}
                                          tooltip={{
                                              text: Menu.labels.tooltips.help,
                                              position: 'bottom',
                                          }}
                                      />
                                  </div>
                                  <div className={Styles.styleRow}>
                                      <VSelect
                                          id="style-select"
                                          valueKey="id"
                                          filterOptions={Menu.filterOptions}
                                          onChange={this.handleSelect}
                                          value={this.selected}
                                          optionRenderer={renderer}
                                          optionHeight={
                                              dynamicOptionHeightHandler
                                          }
                                          options={this.styles}
                                          clearable={false}
                                      />
                                  </div>
                              </div>
                          ) as any)
                        : null
                }
            </TransitionMotion>
        );
    }
}

export function dynamicOptionHeightHandler({
    option,
}: {
    option: StyleOption;
}): number {
    switch (true) {
        case option.label.length > 110:
            return 90;
        case option.label.length > 90:
            return 70;
        case option.label.length > 80:
            return 60;
        case option.label.length > 65:
            return 50;
        case option.label.length > 35:
            return 40;
        default:
            return 30;
    }
}

interface RendererParams {
    focusedOption: any;
    key?: string;
    option: any;
    style: any;
    focusOption(p?: any): void;
    selectValue(p?: any): void;
}

/**
 * Custom render function for React Virtualized Select
 * @param  {Object} focusedOption The option currently focused in the dropdown
 * @param  {Function} focusOption Callback to update the focused option. (on mouseover)
 * @param  {Object} option        The option to be rendered
 * @param  {Function} selectValue Callback to update the selected values. (on click)
 */
export function renderer({
    focusedOption,
    focusOption,
    key,
    option,
    selectValue,
    style,
}: RendererParams): JSX.Element {
    let outputStyle = {
        ...style,
        alignItems: 'center',
        fontWeight: 300,
        cursor: 'default',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        padding: '0 5px',
    };

    if (option.value === 'header') {
        outputStyle = {
            ...outputStyle,
            backgroundColor: '#eee',
            fontWeight: 400,
            height: 30,
            cursor: 'default',
        };
        return <div key={key} style={outputStyle} children={option.label} />;
    }

    switch (true) {
        case option.label.length > 110:
            outputStyle = {
                ...outputStyle,
                height: 90,
            };
            break;
        case option.label.length > 90:
            outputStyle = {
                ...outputStyle,
                height: 70,
            };
            break;
        case option.label.length > 80:
            outputStyle = {
                ...outputStyle,
                height: 60,
            };
            break;
        case option.label.length > 65:
            outputStyle = {
                ...outputStyle,
                height: 50,
            };
            break;
        case option.label.length > 35:
            outputStyle = {
                ...outputStyle,
                height: 40,
            };
            break;
        default:
            outputStyle = {
                ...outputStyle,
                height: 30,
            };
    }

    if (option === focusedOption) {
        outputStyle = {
            ...outputStyle,
            backgroundColor: '#f5f5f5',
        };
    }

    const click = (): void => selectValue(option);
    const focus = (): void => focusOption(option);

    return (
        <div
            key={key}
            style={outputStyle}
            role="option"
            aria-selected={option === focusedOption}
            onClick={click}
            onMouseOver={focus}
            children={option.label}
        />
    );
}
