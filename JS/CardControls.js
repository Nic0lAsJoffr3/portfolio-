import { dataProjects, likedProjects, LikeProject, RemoveLikeProject } from "./Server.js";
import { IMG_heart, IMG_X, IMG_GitHUB, IMG_Site, IMG_Hourglass, IMG_Finished } from "./Images.js"

const projects = document.getElementById("projects")
const URL_base_img = "https://kupffquyjyhacochoqic.supabase.co/storage/v1/object/public/ProjectsImages/"
const Month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
var GlobalDialog = document.createElement("dialog")
projects.appendChild(GlobalDialog)
var Cards = []
export var EveryTags = []
var FilterTags = []

const ProjectsSession = document.getElementById("projects-session")
dataProjects?.forEach(element => {
    if (element.SiteLink != null) {
        element.Tags.push("Site Online")
    }
    if (element.GitHubLink != null) {
        element.Tags.push("GitHub")
    }
    const card = CreateCard(
        element.id,
        element.Name,
        element.Tags,
        element.Likes,
        element.created_at,
        element.isFinished,
        [element.Description, element.GitHubLink, element.SiteLink, element.ImagesCount]
    )

    element.Tags.forEach(tag => {
        if (!EveryTags.includes(tag)) {
            EveryTags.push(tag)
            EveryTags = EveryTags.toSorted()
        }
    })
    Cards.push([card, element.Tags])
});
PlaceCard()
function PlaceCard() {
    if (!projects) alert("Erro Ao Carregar Projetos")
    for (var i = 0; i < Cards.length; i++) {
        if (FilterTags.some(item => Cards[i][1].includes(item)) || FilterTags.length == 0) {
            projects.appendChild(Cards[i][0])
        }
        else {
            Cards[i][0].remove()
        }
    }
}
export function ValidTag(tag) {
    var Valid_Tag = tag.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "")

    if (Valid_Tag == "C#") Valid_Tag = "Csharp"
    Valid_Tag = "TAG_" + Valid_Tag

    return Valid_Tag
}

// create a card
function CreateCard(id = "NoID", titulo = "DefaultProject", tag = [], likes = 0, created_at = null, isFinished, infocard) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.id = id;

    var img = URL_base_img + `Project_${id}/cover.png`
    if (img == null) img = defaultIMG();
    const imagem = document.createElement("img")
    imagem.src = img


    const title = document.createElement("h1")
    title.innerText = titulo

    const tags = document.createElement("ul")
    for (let i = 0; i < tag?.length; i++) {
        let textTag = document.createElement("li")
        textTag.innerText = tag[i]
        textTag.classList.add(ValidTag(tag[i]))
        textTag.addEventListener("click", () => {
            FilterCards(tag[i])
        })

        if (["Site Online", "GitHub"].includes(tag[i])) {
            textTag.style.display = "none"
        }
        tags.appendChild(textTag)

    }

    const buttonInfo = document.createElement("button")
    buttonInfo.classList.add("buttonInfo")
    const info = createInfoSession(id, titulo, img, tag, created_at, ...infocard)
    buttonInfo.addEventListener("click", () => {
        GlobalDialog.replaceWith(info);
        info.show()
    })
    const heartText = document.createElement("p")
    heartText.classList.add("heart_text")
    heartText.innerText = likes.toString()

    const BtnHeart = document.createElement("button");
    const heart = document.createElement("svg");

    if (likedProjects.includes(id)) heart.innerHTML = IMG_heart(true)
    else heart.innerHTML = IMG_heart(false)


    // Likes Logic
    BtnHeart.addEventListener("click", async () => {
        if (likedProjects.includes(id)) {

            const success = await RemoveLikeProject(id);

            if (!success) return;

            const index = likedProjects.indexOf(id);
            likedProjects.splice(index, 1);

            heart.innerHTML = IMG_heart(false);

            heartText.innerText = (
                parseInt(heartText.innerText) - 1
            ).toString();

        } else {

            const success = await LikeProject(id);

            if (!success) return;

            likedProjects.push(id);

            heart.innerHTML = IMG_heart(true);

            heartText.innerText = (
                parseInt(heartText.innerText) + 1
            ).toString();
        }
    });
    BtnHeart.classList.add("heart")
    BtnHeart.appendChild(heart)


    const created = document.createElement("p")
    if (created_at != null) {
        const DataCreated = created_at.match(/\d+/g)
        created.innerText = Month[DataCreated[1] - 1] + ", " + DataCreated[0]
    }
    created.classList.add("created_at")

    const isFinishedDIV = document.createElement("div")
    isFinishedDIV.classList.add("isFinished")

    const IMGFinished = document.createElement("svg")
    IMGFinished.innerHTML = isFinished ? IMG_Finished() : IMG_Hourglass();
    isFinishedDIV.appendChild(IMGFinished)

    const tooltip = document.createElement("div")
    tooltip.classList.add("tooltip", (isFinished ? "Completo" : "EmAndamento"))
    tooltip.innerText = isFinished ? "Completo" : "Em andamento";

    IMGFinished.appendChild(tooltip)



    card.appendChild(imagem)
    card.appendChild(title)
    card.appendChild(BtnHeart)
    card.appendChild(heartText)
    card.appendChild(buttonInfo)
    card.appendChild(created)
    card.appendChild(tags)
    card.appendChild(isFinishedDIV)
    return card;
}


function createInfoSession(id, name, img, tags, created_at, description, gitlink, sitelink, ImagesCount) {
    const InfoSession = document.createElement("dialog")
    InfoSession.classList.add("InfoSession")


    const background = document.createElement("div")
    background.classList.add("background")

    const btnX = document.createElement("button")
    const X = document.createElement("svg")
    X.innerHTML = IMG_X()
    btnX.classList.add("close")
    btnX.addEventListener("click", () => {
        InfoSession.close()
        InfoSession.replaceWith(GlobalDialog)
    })
    btnX.appendChild(X)
    const Name = document.createElement("h1")
    Name.innerText = name
    Name.classList.add("Name")

    const CoverIMG = document.createElement("img")
    CoverIMG.classList.add("coverIMG")
    CoverIMG.src = img

    const Description = document.createElement("description")
    Description.classList.add("description")
    Description.innerText = description

    const TagsArea = document.createElement("div")
    const Tags = document.createElement("ul")
    TagsArea.appendChild(Tags)
    TagsArea.classList.add("TagsArea")
    for (var i = 0; i < tags.length; i++) {
        if (!["GitHub", "Site Online"].includes(tags[i])) {
            const tag = document.createElement("li")
            tag.innerText = tags[i]
            Tags.appendChild(tag)
        }
    }

    const Created = document.createElement("p")
    Created.classList.add("created_at")
    const DateCreated = created_at.match(/\d+/g)
    Created.innerText = `Criado em ${DateCreated[2]} de ${Month[DateCreated[1] - 1]} de ${DateCreated[0]}.`

    const LinkSession = document.createElement("ul")
    LinkSession.classList.add("LinkSession")

    LiLink("Site", sitelink, IMG_Site())
    LiLink("GitHub", gitlink, IMG_GitHUB())

    function LiLink(text, link, icon) {
        if (link != null) {
            const LinkA = document.createElement("a");
            LinkA.innerText = text
            LinkA.href = link

            const LinkIMG = document.createElement("svg")
            LinkIMG.innerHTML = icon

            const LinkLi = document.createElement("li")
            LinkA.appendChild(LinkIMG)
            LinkLi.appendChild(LinkA)
            LinkSession.appendChild(LinkLi)

        }
    }

    const IMGsession = document.createElement("div")
    IMGsession.classList.add("IMGsession")

    for (var i = 0; i < ImagesCount; i++) {
        const IMGcard = document.createElement("img")
        IMGcard.src = (URL_base_img + `Project_${id}/imagem${i}.png`)
        IMGcard.loading = "lazy"
        IMGcard.addEventListener("click", () => {
            IMGcard.requestFullscreen()
        })
        IMGcard.onerror = () => IMGcard.remove();
        IMGsession.appendChild(IMGcard)
    }


    InfoSession.appendChild(background)
    background.appendChild(btnX)
    background.appendChild(Name)
    background.appendChild(CoverIMG)
    background.appendChild(Created)
    background.appendChild(Description)
    background.appendChild(TagsArea)
    background.appendChild(LinkSession)
    background.appendChild(IMGsession)
    return InfoSession
}

// creates a default image
function defaultIMG() {
    const backColor = root.getPropertyValue('--secondary-background');
    const textColor = root.getPropertyValue('--main-color-text')
    const c = document.createElement("canvas")
    c.width = 250
    c.height = 200
    const img = c.getContext("2d")
    img.strokeStyle = textColor
    img.fillStyle = backColor
    img.lineWidth = 4
    img.fillRect(0, 0, 250, 200)
    img.strokeRect(0, 0, 250, 200)
    img.fillStyle = textColor
    img.textAlign = "center"
    img.font = "20px arial"
    img.fillText("Imagem não encontrada", 125, 100)
    return c.toDataURL()
}

// Filter

const Filter = document.getElementById("Filter")
for (let i = 0; i < EveryTags.length; i++) {
    const tagItem = document.createElement("button")
    tagItem.innerText = EveryTags[i]
    tagItem.classList.add(ValidTag(EveryTags[i]))
    tagItem.addEventListener("click", () => {
        FilterCards(EveryTags[i])
    })
    Filter.appendChild(tagItem)
}
export function FilterCards(tag, activeOnly) {
    console.log(FilterTags)

    if (!FilterTags.includes(tag)) {
        FilterTags.push(tag)
    }
    else if (!activeOnly) {
        FilterTags = FilterTags.filter(item => item !== tag)
    }
    PlaceCard()

    EveryTags.forEach(element => {
        const Tags = document.querySelectorAll("." + ValidTag(element))

        if (FilterTags.includes(element)) {
            Tags.forEach(item => {
                item?.classList.add("Active")
            })
        }
        else if (!activeOnly) {
            Tags.forEach(item => {
                item?.classList.remove("Active")
            })
        }
    })
}