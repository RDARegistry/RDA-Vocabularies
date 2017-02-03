---
title: RDA Entity entity
author: Gordon Dunsire
date: 2017-02-03 15:00:00
categories: RDA_Registry Library_Reference_Model RDA_entities
---

A new RDA entity, labelled &quot;RDA Entity&quot;, was included in release [v2.6.0 of the RDA Vocabularies](https://github.com/RDARegistry/RDA-Vocabularies/releases/tag/v2.6.0) on GitHub.

RDA Entity is a super-class of the other RDA entities, as shown in [Representing the RDA ontology: Class hierarchies](http://www.rdaregistry.info/rgAbout/rdaont/ontHierarchies.html). It is intended to support high-level, coarse-grained semantics in the RDA/Library Reference Model ontology, similar to the LRM entity Res. An example is the set of high-level relationship properties described in [Representing the RDA ontology: Relationship matrix](http://www.rdaregistry.info/rgAbout/rdaont/ontRelMatrix.html).

Why not use the label &quot;Res&quot;? There are issues with the plural form, it is derived from Latin, and it is not easy to translate syntactically or semantically. &quot;RDA Entity&quot; also has language issues such as references to &quot;the RDA entity RDA Entity&quot;, so there was not much to choose from. The main requirement is distinction: RDA Entity and Res do not necessarily have the same semantics, although this is generally true for all other RDA and LRM entities with similar labels.

This is part of a general dis-articulation between RDA and the RDF vocabularies of related standards. The approach was developed following discussion between the RDA Registry developers and the then Joint Steering Committee for Development of RDA during discussions at the ALA Annual conference in 2011. The decision was taken to create RDA versions of the FRBR entities instead of re-using the classes in the FRBR namespace, subsequently published in early 2012, because it was known that FRBR would undergo development as part of the consolidation with FRAD and FRSAD that resulted in the LRM. With no formal agreement or desire to lock RDA with any other standard, the use of separate entities allows standards to develop independently, with coherence supported by semantic mappings. The light-weight [Protocol between the RSC and the FRBR Review Group](http://www.rda-rsc.org/sites/all/files/RSC-Chair-12.pdf) allows changes to be monitored and mapping updates to be planned.

RDA Entity is a sub-class of LRM Res. It scopes the RDA view of the universe modelled by the LRM, and keeps it distinct from other views.

Other mappings between RDA and LRM classes and properties will be developed following publication of the LRM in RDF.

Gordon Dunsire
