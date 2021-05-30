export function getRoleName(roleId) {
    switch (roleId) {
        case 0:
            return 'Испытуемый'
        case 1:
            return 'Сотрудник'
        case 2:
            return 'Менеджер'
    }
}