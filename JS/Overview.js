import { FilterCards, ValidTag } from "./CardControls.js";
import { IMG_Curriculum, IMG_Email, IMG_GitHUB, IMG_LinkedIn } from "./Images.js";
const Overview = document.getElementById("Overview")


// Skills

const SkillsSession = document.getElementById("SkillsSession")

const Skills = [
    ["JavaScript", 65],
    ["C#", 35],
    ["Python", 29],
]

for (let i = 0; i < Skills.length; i++) {

    const nameTag = Skills[i][2] != null ? Skills[i][2] : Skills[i][0]
    Skills[i][2] = document.querySelectorAll("." + ValidTag(Skills[i][0])).length - 1

    if (Skills[i][2] < 0) Skills[i][2] = 0

    const Nivel = Skills[i][1] <= 30 ? "Iniciante" : Skills[i][1] <= 70 ? "Intermediário" : "Avançado";

    const skillItem = document.createElement("div")
    skillItem.classList.add("skillItem")

    const Name = document.createElement("h2")
    Name.classList.add("skillName")
    Name.innerText = Skills[i][0]

    if (Skills[i][2] > 0) {
        Name.addEventListener("click", () => {
            FilterCards(Skills[i][0])
        })
        Name.classList.add("isClickable", ValidTag(Skills[i][0]))
    }

    skillItem.appendChild(Name)

    const Bar = document.createElement("div")
    Bar.style.width = `${Skills[i][1]}%`
    Bar.classList.add(Nivel)

    const ProgressBar = document.createElement("div")
    ProgressBar.classList.add("ProgressBar")
    ProgressBar.appendChild(Bar)
    skillItem.appendChild(ProgressBar)

    const NivelText = document.createElement("h2")
    NivelText.classList.add("NivelText", Nivel)
    NivelText.innerText = Nivel
    skillItem.appendChild(NivelText)

    const Projects = document.createElement("h2")
    Projects.classList.add("Projects")

    if (Skills[i][2] > 0) {
        Projects.innerHTML = Skills[i][2] + " projetos"
        Projects.addEventListener("click", () => {
            FilterCards(Skills[i][0])
        })
        Projects.classList.add("isClickable", ValidTag(Skills[i][0]))
    }
    skillItem.appendChild(Projects)

    SkillsSession.appendChild(skillItem)
}
// Tech
const technologies = [
    ["Unity 2d", "2023-06"],
    ["Visual Studio", "2023-06"],
    ["Visual Studio Code", "2023-06"],
    ["Arduino IDE", "2025-06"],
    ["GitHub", "2023-06"]
]
const TechSession = document.getElementById("tech")
const TechUl = document.createElement("ul")
TechUl.classList.add("TechUl")

for (let i = 0; i < technologies.length; i++) {
    const startDate = new Date(technologies[i][1])
    const now = new Date()

    var TotalTime = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth())
    var TextTime = ""
    if (TotalTime < 12) {
        TextTime = TotalTime + " meses"
    }
    else {
        TotalTime = Math.round(TotalTime / 12)
        TextTime = TotalTime + " anos"
    }

    const TechDate = document.createElement("span")
    TechDate.innerText = TextTime

    const TechLi = document.createElement("li")
    TechLi.innerText = technologies[i][0]
    var TechProjects = document.querySelectorAll("." + ValidTag(technologies[i][0])).length - 1
    if (TechProjects > 0) {
        TechLi.addEventListener("click", () => {
            FilterCards(technologies[i][0])
        })
        TechLi.classList.add("isClickable", ValidTag(technologies[i][0]))
    }
    TechLi.appendChild(TechDate)

    TechUl.appendChild(TechLi)
}
TechSession.appendChild(TechUl)
// Me




// Contact

const ContactSession = document.getElementById("Contact")
const ContactList = [
    ["GitHub", "https://github.com/Nic0lAsJoffr3", IMG_GitHUB()],
    ["LinkedIn", "https://www.linkedin.com/in/joffrenicolas/", IMG_LinkedIn()],
    ["Email", "mailto:nicolasjoffredesouza0@gmail.?subject=Oportunidade&body=Olá Nicolas, vi seu portfólio e gostaria de falar com você.", IMG_Email()],
    ["Baixar meu currículo", "../PDF/Currículo-Nícolas-Joffre.pdf", IMG_Curriculum(), true]
]
const ContactUl = document.createElement("ul")

for (var i = 0; i < ContactList.length; i++) {
    const Li = document.createElement("li")
    Li.alt = "link para " + ContactList[i][0]
    const link = document.createElement("a")
    link.href = ContactList[i][1]
    link.target = "_blank"
    link.innerHTML = ContactList[i][0]

    const Icon = document.createElement("svg")
    Icon.innerHTML = ContactList[i][2]
    link.appendChild(Icon)
    Li.appendChild(link)
    ContactUl.appendChild(Li)
}

ContactSession.appendChild(ContactUl)