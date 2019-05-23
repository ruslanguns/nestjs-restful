export function GetOperationId(model: string, operation: string) {
    const _MODEL = ToTitleCase(model).replace(/\s/g, '');
    const _OPERERATION = ToTitleCase(operation).replace(/\s/g, '');

    return {
        title: '',
        operationId: `${_MODEL}_${_OPERERATION}`,
    };
}

function ToTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ');
}
