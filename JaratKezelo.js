class JaratKezelo {
    constructor() {
        this.jaratok = {};
    }

    ujJarat(jaratSzam, repterHonnan, repterHova, indulas) {
        if (this.jaratok.hasOwnProperty(jaratSzam)) {
            throw new Error("A járatszám egyedinek kell lennie!");
        }

        this.jaratok[jaratSzam] = {
            jaratSzam: jaratSzam,
            repterHonnan: repterHonnan,
            repterHova: repterHova,
            indulas: indulas,
            keses: 0
        };
    }

    keses(jaratSzam, keses) {
        if (!this.jaratok.hasOwnProperty(jaratSzam)) {
            throw new Error("Nem létező járat!");
        }

        this.jaratok[jaratSzam].keses += keses;

        if (this.jaratok[jaratSzam].keses < 0) {
            throw new Error("A szumma késés nem lehet negatív!");
        }
    }

    mikorIndul(jaratSzam) {
        if (!this.jaratok.hasOwnProperty(jaratSzam)) {
            throw new Error("Nem létező járat!");
        }

        return new Date(this.jaratok[jaratSzam].indulas.getTime() + this.jaratok[jaratSzam].keses * 60000);
    }

    jaratokRepuloterrol(repter) {
        let jaratokRepterrol = [];

        for (const jarat of Object.values(this.jaratok)) {
            if (jarat.repterHonnan === repter) {
                jaratokRepterrol.push(jarat.jaratSzam);
            }
        }

        return jaratokRepterrol;
    }
}

module.exports = JaratKezelo;