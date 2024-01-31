

export const indicators = {
    POSITIVE: {
        name: '+',
        color: '#17a689'
    },
    NEGATIVE: {
        name: '-',
        color: '#e05465'
    },
    NEUTRAL: {
        name: '·',
        color: '#ccc'
    },
    getColor: (name: string) => {
        let result;
        switch (name) {
            case indicators.POSITIVE.name: result = indicators.POSITIVE.color; break;
            case indicators.NEGATIVE.name: result = indicators.NEGATIVE.color; break;
            default: result = indicators.NEUTRAL.color; break;
        }
        return result;
    }
};
