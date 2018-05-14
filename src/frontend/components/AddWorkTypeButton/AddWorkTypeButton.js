import React from 'react';
import {FormGroup, Input, Label, Button} from 'reactstrap';
import {DataService} from "../DataService";

export class AddWorkTypeButton extends React.Component {

    dataService = new DataService();
    state = {
        isInputVisible: false,
        workType: {name: ""},
    };

    toggle = () => {
        this.setState({
            isInputVisible: !this.state.isInputVisible,
        });
    };
    workTypeChanged = (event) => {
        this.setState({
            workType: {name: event.target.value},
        })
    };

    addWorkType = () => {
        this.dataService.addWorkType(this.state.workType).then(() => {
            this.props.addWorkType(this.state.workType);

            this.setState({
                workType: {name: ""},
                isInputVisible: false,
            })
        });
    };

    getFormGroup = () => {
        if (this.state.isInputVisible) {
            return <FormGroup>
                <Label>Lisa teenus</Label>
                <FormGroup>
                    <Input name="work_type"
                           placeholder="Lisa uus teenus"
                           value={this.state.workType.name}
                           onChange={this.workTypeChanged}/>
                </FormGroup>
                <Button color="secondary" onClick={this.addWorkType}>Lisa</Button>
            </FormGroup>
        }
    };


    render() {
        return (
            <div>
                <FormGroup>
                    <Button className="addButton mb-3" color="secondary" onClick={this.toggle}>Lisa uus teenus</Button>
                    {this.getFormGroup()}
                </FormGroup>
            </div>
        )
    }

}
