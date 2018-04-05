import React from 'react';
import {FormGroup, Input, Label, Button} from 'reactstrap';

export class AddWorkTypeButton extends React.Component {
    state = {
        isInputVisible: false,
        workType: "",
    };

    toggle = () => {
        this.setState({
            isInputVisible: !this.state.isInputVisible,
        });
    };
    workTypeChanged = (event) => {
        this.setState({
            workType: event.target.value,
        })
    };

    addWorkType = () => {
        this.props.addWorkType(this.state.workType)
        this.setState({
            workType: "",
            isInputVisible: false,
        })
    };

    getFormGroup = () => {
        if (this.state.isInputVisible) {
            return <FormGroup>
                <Label>Lisa teenus</Label>
                <Input name="work_type"
                       placeholder="Lisa teenus"
                       value={this.state.workType}
                       onChange={this.workTypeChanged}/>
                <Button color="primary" onClick={this.addWorkType}>Lisa</Button>
            </FormGroup>
        }
    };


    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Lisa tööliik</Button>
                {this.getFormGroup()}
            </div>
        )
    }

}
