export const baseURL = 'https://hh.typex.one';
//export const baseURL = 'http://127.0.0.1:3000';

export function getRoleName(roleId) {
    if (roleId === undefined) return '';
    let roles = ['Соискатель', 'Сотрудник', 'Менеджер'];
    return roles[roleId];
}

export function getPersons(type) {
    return fetch('/api/' + type, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(it => it.json())
}

export const marks = [
    {text: 'Не смогу с ним работать', color: '#FF0000'},
    {text: 'Мне некомфортно работать  с ним', color: '#FF6B00'},
    {text: 'Нейтрально', color: '#D5D840'},
    {text: 'Мне комфортно с ним работать', color: '#98C360'},
    {text: 'Буду рад с ним работать', color: '#14BF25'},
]