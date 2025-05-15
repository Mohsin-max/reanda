import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  cardDetails: any[] = [

    {
      services: '6 services',
      title: 'Conseil en Fusion-acquisition',
      desc: "Nos banquiers d'affaires fournissent des conseils et exécutent diverses transactions de fusion-acquisition des deux côtés, ainsi que des missions stratégiques telles que des coentreprises et des partenariats."

    },
    {
      services: '3 services',
      title: 'Conseil en Levée de Fonds',
      desc: "Nous offrons un soutien complet pour les opérations de marché, la communication financière et les relations investisseurs, qu'il s'agisse de conseil en financement, structuration des opérations et gestion des relations investisseurs."

    },
    {
      services: '4 services',
      title: 'Conseil Stratégique',
      desc: "Nous mettons nos expertises et connaissances au service des organisations privées ou publiques pour les assister à définir et mettre en oeuvre leurs stratégies d'orientation, choix d'investissements et décisions stratégiques."

    },
    {
      services: '5 services',
      title: 'Restructuration Globale',
      desc: "Nos experts en restructuration et en gestion financière se tiennent à vos côtés pour préserver la valeur de votre entreprise, élaborer des stratégies de rebond et optimiser les résultats pour vous, vos actionnaires et vos équipes."

    },

  ]


}
