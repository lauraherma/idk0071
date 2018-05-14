import React from 'react';
import {FormGroup, Input, Label, Button} from 'reactstrap';
import {DataService} from "../DataService";

export class AddHydrogenButton extends React.Component {

    dataService = new DataService();
    state = {
        isInputVisible: false,
        hydrogen: {name: ""},
    };

    toggle = () => {
        this.setState({
            isInputVisible: !this.state.isInputVisible,
        });
    };
    hydrogenChanged = (event) => {
        this.setState({
            hydrogen: {name: event.target.value},
        })
    };

    addHydrogen = () => {
        this.dataService.addHydrogen(this.state.hydrogen).then(() => {
            this.props.addHydrogen(this.state.hydrogen);

            this.setState({
                hydrogen: {name: ""},
                isInputVisible: false,
            })
        });
    };

    getFormGroup = () => {
        if (this.state.isInputVisible) {
            return <FormGroup>
                <Label>Lisa teenus</Label>
                <Input name="work_type"
                       placeholder="Lisa uus teenus"
                       value={this.state.hydrogen.name}
                       onChange={this.hydrogenChanged}/>
                <Button color="secondary" onClick={this.addHydrogen}>Lisa</Button>
            </FormGroup>
        }
    };


    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.toggle}>Lisa uus vesinik</Button>
                {this.getFormGroup()}
            </div>
        )
    }

}
