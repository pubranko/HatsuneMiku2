import { global_runing_events } from '../global/_global';    //グローバル変数

/**
 * 
 * @param
 */
export const grouping_start = (search_group_id: string,search_conditions_id:string): void => {

    let search_conditions = document.querySelectorAll('.p-search_conditions');
    console.log(search_group_id);
    console.log(search_conditions_id);

    search_conditions.forEach(search_condition => {
        console.log(search_condition.id);
        let menu = document.querySelector('#'+search_condition.id+'_menu');
        let menu_nav = menu.querySelector('.p-operation_menu__nav--type2');
        console.log(menu_nav.className);
    });

}