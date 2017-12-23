import { observer } from 'mobx-react';
import * as React from 'react';

import { DialogProps } from 'dialogs';
import ManualDataStore from 'stores/data/manual-data-store';

import Button from 'components/button';
import ActionBar from 'dialogs/components/action-bar';
import ContributorList from 'dialogs/components/contributor-list';
import MetaFields from 'dialogs/components/meta-fields';

interface Props extends DialogProps {
    data: CSL.Data;
    onSubmit(data: any): void;
}

@observer
export default class EditDialog extends React.Component<Props> {
    static readonly labels = top.ABT.i18n.dialogs.edit;

    store: ManualDataStore;

    constructor(props: Props) {
        super(props);
        this.store = new ManualDataStore(props.data.type, this.props.data.id);
        this.store.CSL = props.data;
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.props.onSubmit(this.store.CSL);
    };

    render(): JSX.Element {
        const citationType = this.store.citationType;
        return (
            <form onSubmit={this.handleSubmit}>
                <ContributorList citationType={citationType} people={this.store.people} />
                <MetaFields meta={this.store} />
                <ActionBar style={{ justifyContent: 'flex-end' }}>
                    <Button flat primary type="submit" label={EditDialog.labels.confirm} />
                </ActionBar>
            </form>
        );
    }
}
