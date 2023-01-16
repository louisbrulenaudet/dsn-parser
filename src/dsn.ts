import fs from 'node:fs';
import readline from 'node:readline';
import { ops } from './utils/ops';
import { workContract } from './utils/workContract';
import { extractionsList, field } from './utils/extraction';
import { throws } from 'node:assert';
type societyList = society[]
type establishmentList = establishment[]
type dsnList = dsn[]
type mutualList = mutual[]
type mutualEmployeeList = mutualEmployee[]
type contributionFundList = contributionFund[]
type workContractDefinition = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    numSS: string,
    siren: string,
    date: string
}
type extractionValue = {
    collection: string,
    field: field,
    name: string,
    dsnStructure: string,
    value: string
}

export type dsnObject = {
    softwareName: string | undefined,
    provider: string | undefined,
    softwareVersion: string | undefined,
    dsnVersion: string | undefined,
    type: string | undefined,
    totalRows: string | undefined,
    month: string | undefined

}
type dsn = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string
}

export type ContributionFund = {
    id: string
}

export type societyObject = {
    siren: string | undefined,
    nic: string | undefined,
    apen: string | undefined,
    adress1: string | undefined,
    adress2: string | undefined,
    adress3: string | undefined,
    zipCode: string | undefined,
    city: string | undefined
}

export type EmployeeObject = {
    numSS: string,
    lastname: string,
    surname: string,
    firstname: string,
    sex: string,
    birthday: string,
    placeOfBith: string,
    address1: string,
    codeZip: string,
    city: string,
    country: string,
    codeZipBith: string,
    countryBirth: string,
    address2: string,
    address3: string,
    email: string,
    employeeId: string,
    graduate: string,
    studies: string

}

export type WorkContractObject = {
    startDate: string,
    status: string,
    retirement: string,
    pcs: string,
    pcsBis: string,
    employmentLabel: string,
    contract: string,
    publicDispPolitic: string,
    contractEndDate: string,
    DNACodeUnitTime: string,
    DSNWorkQuotaEstablishment: string,
    DSNWorkQuotaWorkContract: string,
    workTime: string,
    ss: string,
    idcc: string,
    mal: string,
    estabWorkPlace: string,
    vieillesse: string,
    pattern: string,
    vacation: string,
    rateProfessionalFess: string,
    foreigner: string,
    exclusionDsn: string,
    statusEmployment: string,
    unemployment: string,
    idPublicEmployer: string,
    methodUnemployment: string,
    joiningDate: string,
    denunciationDate: string,
    dateManagementAgreement: string,
    idAgreement: string,
    healthRiskDelegate: string,
    multipleJobCode: string,
    multipleEmployerCode: string,
    workAccidentRisk: string,
    idWorkAccidentRisk: string,
    positionCollectiveAgreement: string,
    apecita: string,
    rateAt: string,
    contributingFullTime: string,
    tip: string,
    useEstablishmentId: string,
    livePerfomances: string,
    licences: string,
    showId: string,
    showrunner: string,
    fpPcs: string,
    typePosition: string,
    fpQuotite: string,
    partTimeWork: string,
    serviceCode: string,
    fpIndice: string,
    fpIndiceMaj: string,
    NBI: string,
    indiceOriginal: string,
    article15: string,
    oldEstablishment: string,
    oldIndice: string,
    SPP: string,
    contractual: string,
    secondment: string,
    browsing: string,
    activityDutyRate: string,
    payLevel: string,
    echelon: string,
    coefficient: string,
    boeth: string,
    addPublicPolicy: string,
    arrangement: string,
    finaly: string,
    navy: string,
    cnieg: string,
    activityRate: string,
    grade: string,
    cti: string,
    finess: string,


}
type society = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    date: string
}

export type establishmentObject = {
    siren: string,
    nic: string,
    apet: string,
    adress1: string,
    adress2: string,
    adress3: string,
    zipCode: string,
    country: string,
    idcc: string,
    legalStatus: string,
    opco: string,
    codeZip: string
    city: string,
    date: string
}
type establishment = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    siret: string,
    idEstablishment: number
    date: string
}


export type contributionFund = {
    collection: string,
    field: string,
    dsnStructure: string,
    name: string,
    value: string,
    idEstablishment: number,
    siret: string,
    date: string
}

type mutual = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    date: string,
    techId: string
}

type mutualEmployee = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    numSS: string,
    date: string
}


export type contributionFundObject = {
    codeDsn: string
    name: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    codeZip: string,
    city: string,
    siret: string,
    date: string
}

type classificationObject = {
    nature: string,
    value: string,
    idcc: string,
}


export type mutualObject = {
    contractId?: string,
    organisme?: string,
    delegate?: string,
    covererd?: string,
    techId?: string,
    date: string
}

export type mutualEmployeeObject = {
    option: string,
    pop: string,
    children: string,
    assign: string,
    numberAssign: string,
    otherAssign: string,
    idTechAffiliation: string,
    idTech: string,
    date: string
}

type atObject = {
    code: string,
    rate: string,
    idEstablishment: number
}

type employee = {
    collection: string,
    field: string,
    dsnStructure: string,
    value: string,
    siren: string,
    numSS: string,
    date: string
}

//Norme DSN 2022 = https://www.net-entreprises.fr/media/documentation/dsn-cahier-technique-2022.1.pdf
//NodeJs readline =https://nodejs.org/api/readline.html

export class DsnParser {
    private dsnVersion = ['P22V01']
    private societyList: societyList = []
    private establishmentList: establishmentList = []
    private dsnList: dsnList = []
    private contributionFundList: contributionFundList = []
    private workContractList: workContractDefinition[] = []
    private mutualList: mutual[] = []
    private mutualEmployeeList: mutualEmployeeList = []
    private employeeList: employee[] = []
    private numSSList: string[] = []
    private sirenList: string[] = []
    private idEstablishmentList: number[] = []
    private extractions = extractionsList
    private mutualIdList: string[] = []
    private siren: string = ''
    private date = ''
    async init(dir: string, options = {
        controleDsnVersion: true,
        deleteFile: false
    }) {
        const fileStream = fs.createReadStream(dir);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });
        let mutualId = ''
        let idEstablishment = 1
        let numSS: string = ''
        let siret = ''
        for await (const line of rl) {
            let lineSplit = line.split(',\'');
            let dsnStructure = lineSplit[0]
            let findStructure = this.extractions.find(d => d.dsnStructure === dsnStructure)
            if (findStructure) {
                let value = lineSplit[1].replace('\'', '')
                switch (findStructure.collection) {
                    case 'Dsn':
                        if (lineSplit[0] === 'S10.G00.00.006' && options.controleDsnVersion) {
                            const testVersion = this.dsnVersion.find(d => d === value)
                            if (!testVersion) {
                                throw new Error(`La version du fichier DSN n'est pas supportée`)
                            }
                        }
                        if (lineSplit[0] === 'S20.G00.05.005') {
                            this.date = value
                        }
                        let addDsn: dsn = {
                            ...findStructure,
                            value: value
                        }
                        this.dsnList.push(addDsn)
                        break
                    case 'Society':
                        if (lineSplit[0] === 'S21.G00.06.001') {
                            this.siren = value
                        }
                        let addRowSociety: society = {
                            ...findStructure,
                            value: value,
                            date: this.date
                        }
                        this.societyList.push(addRowSociety)
                        break
                    case 'Establishment':
                        if (lineSplit[0] === 'S21.G00.11.001') {
                            idEstablishment += 1
                            this.idEstablishmentList.push(idEstablishment)
                            siret = this.siren + value
                        }
                        let addRowEstablishment: establishment = {
                            ...findStructure,
                            value: value,
                            siret,
                            idEstablishment,
                            date: this.date

                        }
                        this.establishmentList.push(addRowEstablishment)
                        break
                    case 'ContributionFund':
                        let addContributionFund = {
                            ...findStructure,
                            value,
                            idEstablishment,
                            siret,
                            date: this.date
                        }
                        this.contributionFundList.push(addContributionFund)

                        break
                    case 'WorkContract':
                        let addRoWWorkContract: workContractDefinition = {
                            ...findStructure,
                            value,
                            siren: this.siren,
                            date: this.date,
                            numSS
                        }
                        this.workContractList.push(addRoWWorkContract)
                        break

                    case 'Mutual':
                        if (lineSplit[0] === 'S21.G00.15.005') {
                            mutualId = value
                            this.mutualIdList.push(mutualId)
                        }
                        let addMutual: mutual = {
                            ...findStructure,
                            value,
                            date: this.date,
                            techId: mutualId

                        }
                        this.mutualList.push(addMutual)
                        break
                    case 'MutualEmployee':
                        let addMutualEmployee = {
                            ...findStructure,
                            numSS,
                            value,
                            siren: this.siren,
                            date: this.date

                        }
                        this.mutualEmployeeList.push(addMutualEmployee)
                        break
                    case 'Employee':
                        if (lineSplit[0] === 'S21.G00.30.001') {
                            numSS = value
                            this.numSSList.push(numSS)
                        }
                        let addEmployee = {
                            ...findStructure,
                            value,
                            numSS,
                            siren: this.siren,
                            date: this.date

                        }
                        this.employeeList.push(addEmployee)
                }
            }
        }
        //Delete File 
        if (options.deleteFile) {
            fs.unlinkSync(dir)
        }
    }

    get dsn(): dsnObject {
        let dsnObject: any = {}
        for (let dsn of this.dsnList) {
            dsnObject[dsn.field] = dsn.value
        }
        return dsnObject
    }

    get society(): societyObject {
        let societyObjet: any = {}
        for (let society of this.societyList) {
            societyObjet[society.field] = society.value
        }
        return societyObjet
    }


    get establishment(): establishmentObject[] {
        //idEstablishmentList contient l'ensemble des id établissements qu'on a pu traiter.
        const establishments = []
        for (let idEstablishment of this.idEstablishmentList) {
            let obj: any = new Object()
            let establishmentFilter = this.establishmentList.filter(e => e.idEstablishment === idEstablishment)
            for (let establishment of establishmentFilter) {
                obj[establishment.field] = establishment.value
            }
            establishments.push(obj)
        }
        return establishments

    }


    get contributionFund(): contributionFundObject[] {
        const contributionFundList = []
        for (let idEstablishment of this.idEstablishmentList) {
            let siret = this.establishmentList.find(e => e.idEstablishment === idEstablishment)?.siret
            if (siret) {
                let contributionFundFilter = this.contributionFundList.filter(c => c.idEstablishment === idEstablishment)
                let idDsn = contributionFundFilter.find(c => c.dsnStructure === 'S21.G00.20.001')?.value
                if (idDsn) {
                    const contributionDsn = ops.find(o => o.codeDsn === idDsn)
                    if (contributionDsn) {
                        let contributionFundObject: contributionFundObject = {
                            ...contributionDsn,
                            siret,
                            date: this.date

                        }
                        contributionFundList.push(contributionFundObject)
                    }

                }
            }

        }
        return contributionFundList
    }

    get employee(): EmployeeObject[] {
        const employeeList = []
        for (let numSS of this.numSSList) {
            let employeeFilter = this.employeeList.filter(e => e.numSS === numSS)
            if (employeeFilter) {
                let employeeObject: any = {}
                for (let employee of employeeFilter) {
                    employeeObject[employee.field] = employee.value
                }
                employeeList.push(employeeObject)
            }
        }
        return employeeList
    }
    get workContract(): WorkContractObject[] {
        const workContractList = []
        for (let numSS of this.numSSList) {
            let workContractFilter = this.workContractList.filter(w => w.numSS === numSS)
            if (workContractFilter) {
                let workContractObject: any = {}
                for (let workContract of workContractFilter) {
                    workContractObject[workContract.field] = workContract.value
                }
                workContractList.push(workContractObject)
            }
        }
        return workContractList
    }

    get employeeMutual(): mutualEmployee[] {
        const employeesMutualList: mutualEmployee[] = []
        for (let numSS of this.numSSList) {
            let mutualEmployeeFilter = this.mutualEmployeeList.filter(m => m.numSS === numSS)
            if (mutualEmployeeFilter) {
                let mutualEmployeeObject: any = {}
                for (let mutualEmployee of mutualEmployeeFilter) {
                    mutualEmployeeObject[mutualEmployee.field] = mutualEmployee.value
                }
                employeesMutualList.push(mutualEmployeeObject)
            }
        }
        return employeesMutualList
    }
    get mutual(): mutualObject[] {
        const mutualList: mutualObject[] = []

        for (let mutualId of this.mutualIdList) {
            let mutalFilter = this.mutualList.filter(m => m.techId === mutualId)
            let mutuelObject: any = {}
            if (mutalFilter) {
                for (let mutual of mutalFilter) {
                    mutuelObject[mutual.field] === mutual.value
                }
                mutualList.push(mutuelObject)
            }
        }
        return mutualList
    }

}



