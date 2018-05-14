import {observable} from 'mobx';
import lodash from 'lodash';

export const openAppointment = window.openAppointment = observable([]);

export function setOpenAppointment(appointment) {
    const clonedAppointment = lodash.cloneDeep(appointment);

    if (!clonedAppointment.work) {
        clonedAppointment.work = {};
    }

    if (!clonedAppointment.work.colorCard) {
        clonedAppointment.work.colorCard = {
            colorRecipes: [],
        };
    }

    // clonedAppointment.work.colorCard = {
    //     id: 1,
    //     colorRecipes: [
    //         {
    //             id: 1,
    //             date: '',
    //             colors: [
    //                 {
    //                     id: 100,
    //                     amount: 35,
    //                     code: 'Red',
    //                     company_name: 'Sebastian',
    //                 },
    //                 {
    //                     id: 101,
    //                     amount: 25,
    //                     code: 'Blue',
    //                     company_name: 'Sebastian',
    //                 },
    //                 {},
    //             ],
    //             hydrogens: [
    //                 {
    //                     id: 200,
    //                     amount: 51,
    //                     name: '5%',
    //                     company_name: 'Sebastian',
    //                 },
    //                 {
    //                     id: 201,
    //                     amount: 11,
    //                     name: '15%',
    //                     company_name: 'Sebastian',
    //                 },
    //                 {},
    //             ],
    //         },
    //     ]
    // };

    openAppointment.replace([clonedAppointment]);
}

export function addColorRecipe(colorRecipe) {
    openAppointment.get(0).work.colorCard.colorRecipes.push(colorRecipe);
}

export function setColors(colorRecipe, colors) {
    colorRecipe.colors.replace(colors);
}

export function removeColor(colorRecipe, color) {
    colorRecipe.colors.replace(lodash.without(colorRecipe.colors, color));
}

export function setHydrogens(colorRecipe, hydrogens) {
    colorRecipe.hydrogens.replace(hydrogens);
}

export function removeHydrogen(colorRecipe, hydrogen) {
    colorRecipe.hydrogens.replace(lodash.without(colorRecipe.hydrogens, hydrogen));
}
