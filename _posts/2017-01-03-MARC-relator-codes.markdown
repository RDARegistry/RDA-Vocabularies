---
title: MARC relator codes
author: Gordon Dunsire
date: 2017-01-03 12:00:00
categories: RDA_Registry MARC_21 RDA_relationships
---

Updated alignments and maps between the RDA relationship elements and designators (refinements) and the [MARC code list for relators](http://www.loc.gov/marc/relators/index.html) were included in release [v2.6.1 of the RDA Vocabularies](https://github.com/RDARegistry/RDA-Vocabularies/releases/tag/v2.6.1) on GitHub.

These include:

* [Alignment from RDA properties to MARC relator terms](http://www.rdaregistry.info/Aligns/alignRDA2MRC.html) (csv)
* [Map from RDA properties to MARC Code List for Relators](http://www.rdaregistry.info/Maps/mapRDA2MRC.html) (ttl)
* [Map from MARC Code List for Relators to RDA properties](http://www.rdaregistry.info/Maps/mapMRC2RDA.html) (ttl)

The scope is restricted to relationships between the RDA entities Work, Expression, Manifestation, Item, and Agent (including the sub-entities Person, Family, and Corporate Body). For example, MARC relators involving the entity Place such as [Distribution place](http://id.loc.gov/vocabulary/relators/dbp) are not included. Relators associated exclusively with intellectual property rights are also out of scope; RDA folds the treatment of resources pertaining to copyright, licensing, etc., into the treatment of resources in general.

The full list of excluded MARC relators is:

* Assignee
* Associated name
* Attributed name
* Auctioneer
* Bibliographic antecedent
* Copyright claimant
* Copyright holder
* Depicted
* Distribution place
* Event place
* Expert
* Lender
* Licensee
* Licensor
* Manufacture place
* Other
* Patent holder
* Production place
* Publication place
* Repository
* Setting

MARC relators with no direct equivalent in RDA are aligned and mapped, where possible, with a broad RDA relationship property such as [creator](http://rdaregistry.info/Elements/u/P60447).

This is based primarily on the semantics of the property definitions. Internal mappings presented in the RDF representation of the [MARC Code List for Relators](http://id.loc.gov/vocabulary/relators.html) were used as confirmation, where available.

Properties from the RDA Unconstrained element set are used because there is no clear alignment between the RDA entities and their use in specifying the domains and ranges of the RDA relationship properties, and the representation of the domain and range semantics in id.loc.gov. Using unconstrained properties &quot;dumbs-down&quot; the ontology by ignoring issues of entity definition and scope.

The alignment is intended to support cross-walks between RDA and MARC relationship data used in hybrid MARC 21 records.

The maps are intended to support linked data applications that need to interoperate pure RDA data with MARC 21 legacy data. Data using the constrained RDA element sets can be dumbed-down to the unconstrained level using the [RDA maps: Unconstrained properties](http://www.rdaregistry.info/Maps/#unconstrained). These maps will be updated later in 2017.

Gordon Dunsire
