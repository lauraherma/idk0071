import React from 'react';
import {ColorRecipeColor} from "../ColorRecipeColorTypeColor/ColorRecipeColorTypeColor";
import {ColorRecipeColorTypeHydrogen} from "../ColorRecipeColorTypeHydrogen/ColorRecipeColorTypeHydrogen";
import {Row, Col, Button} from 'reactstrap'
import './ColorRecipe.css';
import {ColorRecipePart} from "../ColorRecipePart/ColorRecipePart";
import lodash from 'lodash';
import {observer} from 'mobx-react';
import {addColorRecipe, openAppointment} from "../../data/openAppointment";
import {DataService} from "../DataService";

export const ColorRecipe = observer(class extends React.Component {
    dataService = new DataService();

    async addColorRecipe () {

        try {
            const colorRecipe = await this.dataService.addEmptyColorRecipeToAppointment(this.appointment.id);

            addColorRecipe(colorRecipe);
        }
        catch (error) {
            console.error(error);
        }
    }

    get appointment () {
        return this.props.appointment[0];
    }

    get colorCard () {
        return this.appointment && this.appointment.work && this.appointment.work.colorCard;
    }

    getColorRecipes () {
        return this.colorCard.colorRecipes.map(colorRecipe =>
            <ColorRecipePart colorRecipe={colorRecipe}
                             key={colorRecipe.id}
                             appointment={this.appointment}/>
        );
    }

    render() {
        return this.appointment && <div className="ColorRecipe">
            <h4>Värvikaart</h4>

            {this.colorCard && this.getColorRecipes()}

            <Button onClick={() => this.addColorRecipe()} color="primary" block>
                Lisa uus värviretsept
            </Button>
        </div>;
    }
});
