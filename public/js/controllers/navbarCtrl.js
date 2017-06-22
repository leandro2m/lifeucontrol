(function () {
    'use strict';

angular
	.module('App')
    .controller('navbarCtrl', navbarCtrl);
	

	function navbarCtrl($scope,$location,$localStorage,AuthenticationService) {
		
	var vm = this;
	
	vm.isLoggedIn = false;
	
	 if ($localStorage.currentUser) {
        vm.isLoggedIn=true;  
		vm.currentUser = $localStorage.currentUser;
     };

	vm.allMenuItens = [
		
	  {
		name: "Nivel Reservatório",
		link: "#",
		subtree: [{
		  name: "Cisterna Bloco 10",
		  link: "cisternaDash_bl10"
		}
		 ]
	  }, 

	 {
		name: "Relatórios",
		link: "#",
		subtree: [{
		  name: "Cisternas Bloco 10 ",
		  link: "relbl10c"
		}
		]
	  },
	   /*{
		name: "Espaço Gourmet",
		link: "#",
		subtree: [{
		  name: "Espaço Gourmet",
		  link: "espGourmet"
		}]
	  },
	
	   {
		name: "Light Control",
		link: "#",
		subtree: [{
		  name: "Light Control",
		  link: "switch"
		}]
	  }*/
	  {
		name: "Monitoramento",
		link: "#",
		subtree: [{
		  name: "Ampliar Tela",
		  link: "singlescreen"
		}/*,{  
			name: "Status da Rede",
			link: "monitor"
		}*/
		]
	}
	
	  ]
	};
	
	})();
