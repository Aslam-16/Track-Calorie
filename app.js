//ui,main app,obj for input
//obj
function obj(id,meal,calorie){
    this.id=id
    this.meal=meal;
    this.calorie=calorie;
}

const data=(()=>{
    const items={
        data:[],
        totalcalorie:0,
        currentitem:null
    }

                 const meal=document.getElementById('item-name')
                 const calorie=document.getElementById('item-calories')
                 const button= document.querySelector('.add-btn')
                 const ul=document.querySelector('#item-list')
                 const updatebtn=document.querySelector(".update-btn");
                 const deletebtn=document.querySelector(".delete-btn");
                 const backbtn=document.querySelector(".back-btn");
                 const clearbtn=document.querySelector(".clear-btn");
                 const field={
                     meal:meal,
                     calorie:calorie,
                     button:button,
                     ul:ul,
                     updatebtn:updatebtn,
                     deletebtn:deletebtn,
                     backbtn:backbtn,
                     clearbtn:clearbtn
                     
                 }

    return {
        item:items.data,
        totalitem:items,
       fields:field

        
    }
})()

const control=(()=>{
    const tc=()=>{
    let totalcalorie=0;
    data.item.forEach((e)=>{
        totalcalorie+=parseInt(e.calorie);
    })
    data.totalitem.totalcalorie=totalcalorie;
    return data.totalitem.totalcalorie
}
const showbutton=()=>{
    data.fields.backbtn.style.display='inline'
    data.fields.updatebtn.style.display='inline'
    data.fields.deletebtn.style.display='inline'
    data.fields.button.style.display='none'

}
const hidebutton=()=>{
    data.fields.backbtn.style.display='none'
    data.fields.updatebtn.style.display='none'
    data.fields.deletebtn.style.display='none'

}
const setcurrentitem=(id)=>{
    let item;
    data.item.forEach((e)=>{
        if(e.id==id){
            item=e;
        }
        data.totalitem.currentitem=item;
        console.log('ll',data.totalitem);
    })
}
   
    return {
        totalcalories:tc,
        showbutton:showbutton,
        hidebutton:hidebutton,
        setcurrentitem:setcurrentitem
    }
})()

const ui=(()=>{
    const ul=data.fields.ul;
    console.log('hhh',data.item);
    const datas=data.item
    const list=()=>{
    const inp=[]
    datas.forEach(e => {
         inp.push(`<li class="collection-item" id="item-${e.id}">
        <strong>${e.meal}: </strong> <em>${e.calorie} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit fa fa-pencil"></i>
        </a>
      </li>`)
    });
    console.log('k',inp);
    ul.innerHTML=inp;
}
    
                


    
    const addmeal=()=>{
        const meal=data.fields.meal.value
        const calorie=data.fields.calorie.value
        const id=ids().next().value
        if(meal!=""){
        const ob=new obj(id,meal,calorie);
        data.item.push(ob);
        console.log('ll',data.item)
        }
    }
    const addtotalcalorie=(tc)=>{
        document.querySelector('.total-calories').innerHTML=tc;
    }
    const editdata=(currentitem)=>{
        data.fields.meal.value=currentitem.meal;
        data.fields.calorie.value=currentitem.calorie
    }
    const updateitem=(currentitem)=>{
        data.item.forEach((e)=>{
            if(e.id==currentitem.id){
                e.meal=currentitem.meal;
                e.calorie=parseInt(currentitem.calorie)    
         }
        })
    }
    const deleteitem=(currentitem)=>{
        data.item.forEach((e,index)=>{
            if(e.id==currentitem.id){
                data.item.splice(index,1);
            }
        })
    }
    return {
        add:addmeal,
        lists:list,
        addcalorietoui:addtotalcalorie,
        editdata:editdata,
        updateitem:updateitem,
        deleteitem:deleteitem
    }
})()

const app=(()=>{
            control.hidebutton()

    data.fields.button.addEventListener('click',function(e){

        e.preventDefault()
        if(data.fields.meal.value=="" || data.fields.calorie.value==""){alert('Incorrect Data')}
        else{
        ui.add()
        ui.lists()
        ui.addcalorietoui(control.totalcalories())
        console.log(data.totalitem,"calo")
        data.fields.meal.value=""
        data.fields.calorie.value=""
        }

        data.fields.ul.addEventListener('click',(e)=>{
            if(e.target.classList.contains('edit')){
                console.log('edit');
                control.showbutton()
                const pid=e.target.parentElement.parentElement.id;
                const [name,id]=pid.split('-')
                console.log('gg',id);
                control.setcurrentitem(id)
                ui.editdata(data.totalitem.currentitem)
            }
        })

        data.fields.updatebtn.addEventListener('click',(e)=>{
            e.preventDefault()
            data.totalitem.currentitem.meal=data.fields.meal.value;
            data.totalitem.currentitem.calorie=data.fields.calorie.value;
            console.log('cut',data.totalitem.currentitem);
            ui.updateitem(data.totalitem.currentitem);
            ui.addcalorietoui(control.totalcalories())
            ui.lists()
            control.hidebutton()
            data.fields.meal.value=""
            data.fields.calorie.value=""
            console.log('item',data.item);

        })

        data.fields.deletebtn.addEventListener('click',(e)=>{

            ui.deleteitem(data.totalitem.currentitem)
            ui.lists()
            ui.addcalorietoui(control.totalcalories())
            control.hidebutton()
            data.fields.meal.value=""
            data.fields.calorie.value=""
            console.log('item',data.item);
        })
    })
    data.fields.backbtn.addEventListener('click',(e)=>{
        control.hidebutton()
         data.fields.meal.value=""
         data.fields.calorie.value=""
    })
    data.fields.clearbtn.addEventListener('click',(e)=>{
        e.preventDefault()
        if(data.item.length==0){
            alert('No data to clear')
        }
        else{
        console.log('lolo');
        data.item.splice(0,data.item.length)
        data.totalitem.totalcalorie=0
        ui.lists()
                console.log('lolo',data.totalitem);

        ui.addcalorietoui(control.totalcalories())
        }
    })
   

})()


const ids=function*(){
        let n=0;
        while(true){
            if(data.item.length>0){
                n=data.item.length+1;
            }
            else{
                n=n+1;
            }
            yield n;
        }
        
    }

