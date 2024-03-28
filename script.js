
function Product(id,name,price)
{

	this.id=id;
	this.name=name;
	this.price=price;
}
var p1 = new Product(1,"ATLAS ROBOT", 100000)
var p2 = new Product(2,"SPOT MINI", 75000) 
var p3 = new Product(3,"QUANTUM COMPUTER", 1000000)
var products = [p1,p2,p3]; 


function retrievePurchase()
{
	var purchase = JSON.parse(localStorage.getItem('purchases')?localStorage.getItem('purchases'):"[]");
	return purchase

}
function savePurchase()
{

	localStorage.setItem('purchases',JSON.stringify(purchase));
	var pur = JSON.parse(localStorage.getItem('purchases'));
	console.log(pur)


}


function updatePurchases(purch)
{
	localStorage.setItem('purchases',JSON.stringify(purch));

}
function savedetails()
{
	localStorage.setItem('products',JSON.stringify(products));
}

function refreshTotal(total)
{

	var x = document.getElementById('totalLabel');
	x.innerText=total;
}
function refreshTable()
{
	$('#item-table-body').html('');
	var pur = retrievePurchase();						//get purchase object
	var t = JSON.parse(localStorage.getItem('total'));	//get total from localStorage
	var total=0;

	for(var p of pur)
	{
		var pq = (p.qty)*(p.price)
		$('#item-table').append("<tr> <td>" + p.id + " </td> <td>" + p.name + "</td> <td>" + p.price + " </td> <td>" + "  <button id=plus"+p.id+">+</button> "  + p.qty + "  <button id=sub"+p.id+">-</button>" +  "</td> <td>" + pq + " </td></tr>")
		total+=pq;
	}


	$("button").click(function(e){
	    var idClicked = e.target.id;
	    var pp = retrievePurchase();

	    for(i=0;i<pp.length;i++)
	    {
	    	var ob=pp[i];
	    	if(("plus"+ob.id)===idClicked)
	    	{
	    		ob.qty++;
	    	}
	    	if(("sub"+ob.id)===idClicked)
    		{
	    		ob.qty--;
	    		if(ob.qty<=0)
	    		{
	    			pp.splice(i,1);

	    		}
    		}
	    }

    	updatePurchases(pp)
    	refreshTable()
	});

	refreshTotal(total);
}


function checkPurchases(id)
{
	var pur = retrievePurchase();
	for(var p of pur)
	{
		if(p.id==id)
		{
			return p.qty;
		}
	}
	return 0;
}

$(function()
{

	savedetails()
	retrievePurchase();
	refreshTable();
	$("button").click(function(e)
	{
		var	idClicked = e.target.id;
		for(i=1;i<=3;i++)//changing the condition statement to match it to the total number of products which is 3
		{
			if(idClicked===("btn"+i))	//btn1 in this case
			{
				purchase = retrievePurchase();
				var id=i;
				var det = getDetails(id);//get the details of id=1,2,3
				if(det!==0)
				{
					purchase.push({
						id:id,
						name:det.name,
						price:det.price,
						qty:det.qty
						});
				}
				savePurchase();
				retrievePurchase();
				refreshTable();
			}


		}

	});


	function getDetails(id)
	{
		var pro;
		var containsAlready = checkPurchases(id);
		var products = JSON.parse(localStorage.getItem('products'));

		if(containsAlready==0)
		{
			for(p of products)
			{
				if(p.id===id)
				{
					pro =
					{
						name:p.name,
						price:p.price,
						qty:1
					}
				}
			}
			return pro
		}
		else
		{
			window.alert("This item exists in Cart. Kindly view your cart !");
			return 0;
		}

	}
})
  